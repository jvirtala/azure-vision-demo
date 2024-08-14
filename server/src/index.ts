// create an express app
import express, { Express, Request, Response } from 'express';
import multer from 'multer';
import { PhotoAnalysis } from './PhotoAnalysis';

const app: Express = express();
const port: number = 3000; // You can change this port number if needed

app.use(express.json()); // Middleware to parse JSON bodies
const upload = multer({ storage: multer.memoryStorage() });

app.post('/photoanalysis', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const photoAnalysis = new PhotoAnalysis();
    const result = await photoAnalysis.analyze(req.file.buffer);

    res.json(result);
  } catch (error) {
    console.error('Error analyzing photo:', error);
    res.status(500).send('An error occurred while analyzing the photo.');
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

