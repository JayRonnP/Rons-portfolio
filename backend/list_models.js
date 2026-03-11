const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // Correct way to list models in many versions of the SDK
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await response.json();
        if (data.models) {
            console.log('Available models:');
            data.models.forEach(m => console.log(`- ${m.name}`));
        } else {
            console.log('No models found or error:', data);
        }
    } catch (err) {
        console.error('Error fetching models:', err.message);
    }
}

listModels();
