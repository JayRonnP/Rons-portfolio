const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

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

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route for any request not handled above, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
