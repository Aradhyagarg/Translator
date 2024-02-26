const express = require('express');
const translate = require('translate-google');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint for translation
app.post('/translate', async (req, res) => {
  try {
    // Check if the request body contains the required 'text' field
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Missing text field in the request body' });
    }

    // Perform translation using translate-google
    const translatedText = await translate(text, { to: 'fr' });

    // Respond with the translated text
    res.json({ translation: translatedText });
  } catch (error) {
    // Handle any errors
    console.error('Translation error:', error.message);
    res.status(500).json({ error: 'An error occurred during translation' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
