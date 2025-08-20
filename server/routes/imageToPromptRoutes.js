import express from 'express';
import multer from 'multer';
import OpenAI from 'openai';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to generate prompt from image
router.post('/generate-prompt', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Convert image to base64
    const base64Image = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    // Use OpenAI's GPT-4 Vision to analyze the image
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image and provide a detailed, descriptive prompt that could be used to recreate it with DALL-E. Focus on the visual elements, style, composition, colors, and any distinctive features. Make it specific and detailed enough to generate a similar image."
            },
            {
              type: "image_url",
              image_url: {
                url: dataURI
              }
            }
          ]
        }
      ],
      max_tokens: 500,
    });

    const generatedPrompt = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      data: {
        prompt: generatedPrompt,
        originalImage: dataURI
      }
    });

  } catch (error) {
    console.error('Error generating prompt from image:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate prompt from image'
    });
  }
});

export default router;
