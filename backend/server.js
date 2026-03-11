const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 5000;

// Gemini setup — API key never leaves the server
if (!process.env.GEMINI_API_KEY) {
  console.error('SERVER ERROR: GEMINI_API_KEY is missing from backend/.env');
  console.error('Please create the file backend/.env and add your API key.');
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `You are a helpful and professional AI assistant for Ron's portfolio website.
Ron is an Information Technology student specializing in UI/UX Design and Web Development.
His technical skills include React, Tailwind CSS, Node.js, Figma, Canva, JavaScript, HTML5, and CSS3.
He creates high-impact digital assets and accessible web interfaces.
He has projects in both Graphic Design and Web Development.
Your role is to answer questions about Ron, his skills, and his portfolio in a friendly, concise, and engaging tone.
If someone asks a question unrelated to Ron's portfolio, politely steer the conversation back. Keep responses relatively short.`;

app.use(cors());
app.use(express.json());

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }
  console.log('\n--- New Contact Submission ---');
  console.log(`Name:    ${name}`);
  console.log(`Email:   ${email}`);
  console.log(`Message: ${message}`);
  console.log('------------------------------\n');
  return res.status(200).json({ message: 'Thank you for reaching out!' });
});

app.get('/api/debug', (req, res) => {
  res.json({
    hasKey: !!process.env.GEMINI_API_KEY,
    keyPrefix: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 5) + '...' : 'none',
    port: process.env.PORT || 5000
  });
});

// Secure Gemini proxy — API key stays on the server
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
    });
    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(message);
    return res.status(200).json({ reply: result.response.text() });
  } catch (err) {
    console.error('Gemini error:', err.message);
    return res.status(500).json({ error: 'AI service unavailable. Please try again.' });
  }
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
