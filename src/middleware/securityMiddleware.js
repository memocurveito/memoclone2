// src/middleware/securityMiddleware.js

const { ProfanityFilter } = require('some-profanity-filter-package'); // Choose a profanity filter package
const MAX_CARDS = 100; // Set your limit for maximum cards per user
const MAX_TESTS = 10; // Set your limit for maximum tests per user

const profanityFilter = new ProfanityFilter();

const securityMiddleware = (req, res, next) => {
    const userId = req.user.id; // Assuming you have user authentication setup and user ID is available
    const cardCount = getUserCardCount(userId); // Implement this function to get user's card count
    const testCount = getUserTestCount(userId); // Implement this function to get user's test count

    // Check if user exceeds card or test limits
    if (cardCount >= MAX_CARDS) {
        return res.status(403).json({ message: 'Card limit exceeded' });
    }
    if (testCount >= MAX_TESTS) {
        return res.status(403).json({ message: 'Test limit exceeded' });
    }

    // Check for profanity in request body (for card creation or test creation)
    if (req.body && (req.body.title || req.body.content)) {
        const content = req.body.title || req.body.content;
        if (profanityFilter.isProfane(content)) {
            return res.status(400).json({ message: 'Profanity is not allowed' });
        }
    }

    next();
};

const getUserCardCount = (userId) => {
    // Implement logic to retrieve user's card count from the database
    return 0; // Placeholder return, replace with actual count
};

const getUserTestCount = (userId) => {
    // Implement logic to retrieve user's test count from the database
    return 0; // Placeholder return, replace with actual count
};

module.exports = securityMiddleware;
