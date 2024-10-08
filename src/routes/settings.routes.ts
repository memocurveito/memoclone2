import express from 'express';
import UserSettings from '../models/settings.model';

const router = express.Router();

// Update user settings
router.put('/settings', async (req, res) => {
    const { userId, settings } = req.body;

    try {
        const updatedSettings = await UserSettings.findOneAndUpdate(
            { userId },
            settings,
            { new: true, upsert: true } // Create a new document if it doesn't exist
        );
        res.status(200).json({ message: 'Settings updated successfully', updatedSettings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

export default router;
