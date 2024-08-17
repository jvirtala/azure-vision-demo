// create an express app
import express, { Express, Request, Response } from 'express';
import multer from 'multer';
import { analyzePhoto } from './PhotoAnalysis';
import { analyzeSentiment } from './SentimentAnalysis';

const app: Express = express();
const port: number = 3000; // You can change this port number if needed

app.use(express.json()); // Middleware to parse JSON bodies
const upload = multer({ storage: multer.memoryStorage() });

app.post('/photoanalysis', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const result = await analyzePhoto(req.file.buffer);

    res.json(result);
  } catch (error) {
    console.error('Error analyzing photo:', error);
    res.status(500).send('An error occurred while analyzing the photo.');
  }
});

app.post('/sentiment', async (req: Request, res: Response) => {
  try {
    const text = req.body.text;

    if (!text || typeof text !== 'string') {
      return res.status(400).send('Text query parameter is required and must be a string.');
    }

    const result = await analyzeSentiment(text);

    res.json(result);
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    res.status(500).send('An error occurred while analyzing the sentiment.');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

