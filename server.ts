import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON with generous limit for audio payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Initialize Google GenAI client (Always on server-side)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Audio transcription endpoint using gemini-3.5-transcribe
app.post('/api/transcribe', async (req: Request, res: Response) => {
  try {
    const { audioBase64, mimeType = 'audio/webm', context } = req.body;

    if (!audioBase64) {
      return res.status(400).json({ error: 'Missing audioBase64 in request body.' });
    }

    // Clean up base64 prefix if present
    const cleanBase64 = audioBase64.replace(/^data:[^;]+;base64,/, '');

    const audioPart = {
      inlineData: {
        mimeType: mimeType || 'audio/webm',
        data: cleanBase64,
      },
    };

    const promptText = context
      ? `Transcribe this audio precisely. This is clinical/cycle journal audio about: ${context}. Transcribe exactly what is spoken with proper punctuation.`
      : 'Transcribe this audio precisely. Capture all medical terms, hormonal symptoms, phase details, and reflections accurately with clean punctuation.';

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          { text: promptText },
        ],
      },
    });

    const transcript = response.text || '';
    return res.json({ transcript });
  } catch (error: any) {
    console.error('Transcription error with gemini-3.5-transcribe:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to transcribe audio with gemini-3.5-transcribe',
    });
  }
});

// AI Companion Consultation Endpoint
app.post('/api/companion/ask', async (req: Request, res: Response) => {
  try {
    const { question, userPhase = 'Follicular', cycleDay = 9 } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const systemInstruction = `You are Sakhi AI, an empathetic, board-certified endocrine and infradian rhythm bio-intelligence companion. 
The user is currently in their ${userPhase} Phase (Day ${cycleDay}). 
Provide grounded, trauma-informed, scientifically backed endocrine guidance with warm sisterhood tone. Keep answers concise, actionable, and elegant.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ answer: response.text || '' });
  } catch (error: any) {
    console.error('Companion endpoint error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to get companion answer' });
  }
});

// Mount Vite or static server
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Sakhi Sanctuary server running on port ${PORT}`);
  });
}

startServer();
