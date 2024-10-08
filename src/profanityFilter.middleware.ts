import { Request, Response, NextFunction } from 'express';
import Filter from 'bad-words';

const filter = new Filter();

export const ProfanityFilterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Assuming the text to be checked is in the request body
  if (req.body && req.body.text) {
    const hasProfanity = filter.isProfane(req.body.text);
    if (hasProfanity) {
      return res.status(400).json({ error: 'Profanity is not allowed!' });
    }
  }
  next();
};
