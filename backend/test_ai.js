const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const SYSTEM_INSTRUCTION = `You are a helpful and professional AI assistant for Ron's portfolio website.`;

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const modelsToTest = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-2.0-flash'];

    for (const modelName of modelsToTest) {
        console.log(`\n--- Testing model: ${modelName} ---`);
        try {
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: SYSTEM_INSTRUCTION,
            });
            const chat = model.startChat({ history: [] });
            const result = await chat.sendMessage("Hi");
            console.log(`Success! Reply: ${result.response.text().substring(0, 50)}...`);
            return; // Stop if one works
        } catch (err) {
            console.error(`Error with ${modelName}:`, err.message);
            if (err.stack) console.error(err.stack);
        }
    }
}

test();
