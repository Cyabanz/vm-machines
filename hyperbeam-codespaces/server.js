require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend

// Hyper Beam API Config
const HYPERBEAM_API_KEY = process.env.sk_test_IfATh9MlCs7QtUVFbNlzgj4HPxOoGQQuwqb8-hpYwq0;
const HYPERBEAM_API_URL = 'https://engine.hyperbeam.com/v0/vm';

// Create a new Hyper Beam session
app.post('/api/sessions', async (req, res) => {
    try {
        const response = await axios.post(
            HYPERBEAM_API_URL,
            {
                timeout: { offline: 300 }, // 5-minute timeout
                ublock: true, // Enable ad-blocker
            },
            {
                headers: {
                    'Authorization': `Bearer ${sk_test_IfATh9MlCs7QtUVFbNlzgj4HPxOoGQQuwqb8-hpYwq0}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json({
            success: true,
            sessionUrl: response.data.session_url,
            embedUrl: response.data.embed_url,
            sessionId: response.data.id,
        });
    } catch (error) {
        console.error("Hyper Beam Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, error: "Failed to create session" });
    }
});

// Fallback route for frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 Open the preview in Codespaces to test!`);
});
