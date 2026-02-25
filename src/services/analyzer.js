/**
 * Token analysis runner.
 */
const { exec } = require('child_process');
const { ANALYZE_SCRIPT } = require('../config');

function runAnalyzer() {
    const nodePath = process.execPath;
    exec(`"${nodePath}" "${ANALYZE_SCRIPT}"`, (err, stdout, stderr) => {
        if (err) console.error('[Analyzer] Error:', stderr);
    });
}

module.exports = { runAnalyzer };
