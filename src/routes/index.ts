// routes/index.ts

import express from 'express';
import flashcardsRoutes from './flashcards.routes'; // Assuming this is your flashcard routes

const router = express.Router();

// Connect the flashcard routes
router.use('/api', flashcardsRoutes);

export default router;
