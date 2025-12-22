import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },

    // Admin specific fields
    department: { type: String },

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Admin', adminSchema);
