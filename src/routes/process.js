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

    console.log(`[Kill] Stopping all scripts by ${req.ip} at ${new Date().toISOString()}`);

    const openclawCmd = getOpenClawCommand();

    // 只停止 gateway，不执行 install
    exec(`${openclawCmd} gateway stop`, { timeout: 10000 }, (stopErr, stopStdout, stopStderr) => {
        if (stopErr) {
            console.warn('[Kill] Stop warning:', stopStderr || stopErr.message);
            res.json({ status: 'stopped', message: 'Gateway stopped (with warnings)' });
        } else {
            console.log('[Kill] Gateway stopped successfully');
            res.json({ status: 'stopped', message: 'Gateway stopped successfully' });
        }
    });
});

router.post('/api/gateway/start', (req, res) => {
    if (!rateLimit('gateway_start', 5000)) {
        return res.status(429).json({ error: 'Please wait at least 5 seconds before retrying.' });
    }
    console.log(`[Gateway] Start requested by ${req.ip} at ${new Date().toISOString()}`);

    const openclawCmd = getOpenClawCommand();

    // 先 install，再 start
    exec(`${openclawCmd} gateway install && ${openclawCmd} gateway start --background`, { timeout: 30000 }, (err, stdout, stderr) => {
        if (err) {
            console.error('[Gateway] Start failed:', stderr || err.message);
            res.json({ status: 'error', message: stderr || err.message });
        } else {
            console.log('[Gateway] Started successfully:', stdout.trim());
            res.json({ status: 'started', message: stdout.trim() || 'Gateway started successfully' });
        }
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
