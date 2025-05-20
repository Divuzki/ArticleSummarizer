import express from 'express';
import cors from 'cors';
import { summarizeText } from './summarizer.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.post('/api/summarize', async (req, res) => {
  try {
    const { text, sentenceCount } = req.body;
    
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'No text provided' });
    }

    const count = sentenceCount || 5; // Default to 5 sentences
    
    const summary = await summarizeText(text, count);
    
    res.json({ summary });
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ 
      error: 'Failed to generate summary',
      message: error.message 
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});