/**
 * OpenClaw command and workspace detection service.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { HOME_DIR, APP_DIR } = require('../config');

let workspaceCache = null;

function findWorkspace() {
    // 1. Explicit env var (Highest priority)
    if (process.env.OPENCLAW_WORKSPACE) return process.env.OPENCLAW_WORKSPACE;

    // 2. Return cached
    if (workspaceCache) return workspaceCache;

    // 3. Relative path (Default installation structure: .../openclaw/skills/clawbridge)
    const relative = path.resolve(APP_DIR, '../../');
    if (fs.existsSync(path.join(relative, 'memory'))) {
        workspaceCache = relative;
        return relative;
    }

    // 4. Common path probing (For standalone/sandbox installs)
    const candidates = [
        path.join(HOME_DIR, 'clawd'), // Legacy clawdbot/clawd path
        path.join(HOME_DIR, '.openclaw'), // Standard OpenClaw storage
        process.cwd(),
    ];

    for (const p of candidates) {
        if (fs.existsSync(path.join(p, 'memory'))) {
            console.log(`[Init] Probed workspace found: ${p}`);
            workspaceCache = p;
            return p;
        }
    }

    // 5. Fallback
    workspaceCache = relative;
    return relative;
}

function getOpenClawCommand() {
    if (process.env.OPENCLAW_PATH) return process.env.OPENCLAW_PATH;
    try {
        execSync('which openclaw', { stdio: 'pipe' });
        return 'openclaw';
    } catch (e) {
        /* expected: openclaw may not be in PATH */
    }
    // Dynamic: look for openclaw in same bin dir as current Node.js
    const nodeBinDir = path.dirname(process.execPath);
    const localPath = path.join(nodeBinDir, 'openclaw');
    if (fs.existsSync(localPath)) return localPath;
    return 'openclaw';
}

// Resolve once at startup
const WORKSPACE_DIR = findWorkspace();

module.exports = { findWorkspace, getOpenClawCommand, WORKSPACE_DIR };
