import mongoose from 'mongoose';

const userSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    notificationsEnabled: { type: Boolean, default: true },
    darkMode: { type: Boolean, default: false },
    // Add more settings fields as necessary
}, { timestamps: true });

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);
export default UserSettings;
