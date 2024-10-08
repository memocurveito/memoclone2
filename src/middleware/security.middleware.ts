// src/middleware/security.middleware.ts

import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProfanityFilter } from 'some-profanity-filter-package'; // Choose a profanity filter package

const MAX_CARDS = 100; // Set your limit for maximum cards per user
const MAX_TESTS = 10; // Set your limit for maximum tests per user

const profanityFilter = new ProfanityFilter();

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const userId = req.user.id; // Assuming you have user authentication setup and user ID is available
        const cardCount = this.getUserCardCount(userId); // Implement this function to get user's card count
        const testCount = this.getUserTestCount(userId); // Implement this function to get user's test count

        // Check if user exceeds card or test limits
        if (cardCount >= MAX_CARDS) {
            throw new HttpException('Card limit exceeded', HttpStatus.FORBIDDEN);
        }
        if (testCount >= MAX_TESTS) {
            throw new HttpException('Test limit exceeded', HttpStatus.FORBIDDEN);
        }

        // Check for profanity in request body (for card creation or test creation)
        if (req.body && (req.body.title || req.body.content)) {
            const content = req.body.title || req.body.content;
            if (profanityFilter.isProfane(content)) {
                throw new HttpException('Profanity is not allowed', HttpStatus.BAD_REQUEST);
            }
        }

        next();
    }

    private getUserCardCount(userId: string): number {
        // Implement logic to retrieve user's card count from the database
        return 0; // Placeholder return, replace with actual count
    }

    private getUserTestCount(userId: string): number {
        // Implement logic to retrieve user's test count from the database
        return 0; // Placeholder return, replace with actual count
    }
}
