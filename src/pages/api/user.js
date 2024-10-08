// src/pages/api/user.js
import { saveUserProgress, fetchUserProgress } from '../../lib/dbOperations';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { userId, progressData } = req.body;
      await saveUserProgress(userId, progressData);
      res.status(200).json({ message: 'User progress saved.' });
      break;

    case 'GET':
      const { userId: fetchUserId } = req.query;
      const userProgress = await fetchUserProgress(fetchUserId);
      res.status(200).json(userProgress);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
