import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin', enum: ['admin', 'superadmin'] }, // Enforce role
    institution: { type: String, default: 'DYPCOE' },
    isVerified: { type: Boolean, default: true }, // Admins usually auto-verified
    createdAt: { type: Date, default: Date.now },
});

// Helper model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
