/**
 * POST /api/kill, POST /api/gateway/restart
 */
const router = require('express').Router();
const { exec } = require('child_process');
const path = require('path');
const { rateLimit } = require('../utils/rateLimit');
const { getOpenClawCommand, WORKSPACE_DIR } = require('../services/openclaw');

router.post('/api/kill', (req, res) => {
    if (req.body?.confirm !== true) {
        return res.status(400).json({ error: 'Confirmation required. Send { "confirm": true } in request body.' });
    }
    if (!rateLimit('kill', 5000)) {
        return res.status(429).json({ error: 'Please wait before retrying.' });
    }

    console.log(`[Kill] Stopping gateway by ${req.ip} at ${new Date().toISOString()}`);

    const openclawCmd = getOpenClawCommand();

    // Step 1: Stop gateway
    exec(`${openclawCmd} gateway stop`, { timeout: 10000 }, (stopErr, stopStdout, stopStderr) => {
        if (stopErr) {
            console.warn('[Kill] Stop warning:', stopStderr || stopErr.message);
        }
        console.log('[Kill] Gateway stopped, waiting 10 seconds...');

        // Step 2: Wait 10 seconds, then install and restart
        setTimeout(() => {
            exec(`${openclawCmd} gateway install && ${openclawCmd} gateway start --background`, { timeout: 30000 }, (startErr, startStdout, startStderr) => {
                if (startErr) {
                    console.error('[Kill] Start failed:', startStderr || startErr.message);
                    res.json({ status: 'error', message: startStderr || startErr.message });
                } else {
                    console.log('[Kill] Gateway restarted successfully');
                    res.json({ status: 'stopped_and_restarted', message: 'Gateway stopped and restarted after 10 seconds' });
                }
            });
        }, 10000);

        res.json({ status: 'stopping', message: 'Gateway stopped, will restart in 10 seconds...' });
    });
});

router.post('/api/gateway/restart', (req, res) => {
    if (!rateLimit('gateway_restart', 10000)) {
        return res.status(429).json({ error: 'Please wait at least 10 seconds before retrying.' });
    }
    console.log(`[Gateway] Restart requested by ${req.ip} at ${new Date().toISOString()}`);

    // Check if openclaw gateway is managed by launchctl
    exec("launchctl list | grep -i 'openclaw.gateway'", (checkErr, stdout) => {
        const isLaunchAgent = stdout && stdout.includes('openclaw.gateway');

        if (isLaunchAgent) {
            // Use launchctl to restart LaunchAgent
            console.log('[Gateway] Detected LaunchAgent, using launchctl to restart');
            exec("launchctl unload ~/Library/LaunchAgents/ai.openclaw.gateway.plist 2>/dev/null; launchctl load ~/Library/LaunchAgents/ai.openclaw.gateway.plist", { timeout: 15000 }, (err, stdout, stderr) => {
                if (err) {
                    console.error('[Gateway] LaunchAgent restart failed:', stderr);
                    res.json({ status: 'error', message: stderr || err.message });
                } else {
                    console.log('[Gateway] LaunchAgent restarted successfully');
                    res.json({ status: 'restarted', message: 'Gateway (LaunchAgent) restarted successfully' });
                }
            });
        } else {
            // Manual process - use pkill and start
            console.log('[Gateway] Detected manual process, using pkill + start');
            exec("pkill -SIGTERM -f 'openclaw gateway' || true", (killErr, killStdout, killStderr) => {
                if (killErr && killErr.code !== 1) {
                    console.warn('[Gateway] Kill warning:', killStderr);
                }
                setTimeout(() => {
                    const cmd = `${getOpenClawCommand()} gateway start --background`;
                    exec(cmd, { timeout: 15000 }, (err, stdout, stderr) => {
                        if (err) {
                            console.error('[Gateway] Restart failed:', stderr);
                            res.json({ status: 'error', message: stderr || err.message });
                        } else {
                            console.log('[Gateway] Restart success:', stdout.trim());
                            res.json({ status: 'restarted', message: stdout.trim() || 'Gateway started successfully' });
                        }
                    });
                }, 2000);
            });
        }
    });
});

module.exports = router;
