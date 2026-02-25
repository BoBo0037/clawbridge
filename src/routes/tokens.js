/**
 * GET /api/tokens, POST /api/tokens/refresh
 */
const router = require('express').Router();
const fs = require('fs');
const { TOKEN_FILE } = require('../config');
const { runAnalyzer } = require('../services/analyzer');

router.get('/api/tokens', (req, res) => {
    if (!fs.existsSync(TOKEN_FILE)) return res.json({});
    try {
        const data = fs.readFileSync(TOKEN_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (e) { res.status(500).json({ error: 'Read failed' }); }
});

router.post('/api/tokens/refresh', (req, res) => {
    runAnalyzer();
    res.json({ status: 'triggered', message: 'Analysis started.' });
});

module.exports = router;
