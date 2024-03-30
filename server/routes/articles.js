const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const multer = require('multer');

// Setting up multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new article
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { articleHead, articleDescription } = req.body;

    if (!articleHead || !articleDescription) {
      return res.status(400).json({ message: 'Article head and description are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype
    };

    const newArticle = await Article.create({
      articleHead,
      articleDescription,
      image
    });

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an article by ID
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { articleHead, articleDescription } = req.body;

    if (!articleHead || !articleDescription) {
      return res.status(400).json({ message: 'Article head and description are required' });
    }

    let image = {};

    if (req.file) {
      image = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, {
      articleHead,
      articleDescription,
      ...(req.file && { image })
    }, { new: true });

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(updatedArticle);
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid article ID' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
});

// Delete an article by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
