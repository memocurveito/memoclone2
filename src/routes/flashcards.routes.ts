// routes/flashcards.routes.ts

import express from 'express';
import { Flashcard } from '../models/Flashcard';

const router = express.Router();

// Create a new flashcard
router.post('/flashcards', async (req, res) => {
    const { userId, question, answer } = req.body;

    // Generate a unique URL key (you can implement your own logic)
    const urlKey = `${userId}-${Date.now()}`; // Example: userId and timestamp

    try {
        const newFlashcard = new Flashcard({ userId, question, answer, urlKey });
        await newFlashcard.save();
        res.status(201).json({ message: 'Flashcard created successfully', flashcard: newFlashcard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create flashcard' });
    }
});

export default router;
