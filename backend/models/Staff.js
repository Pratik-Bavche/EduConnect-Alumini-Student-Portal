import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'staff' },

    // Staff Specific Details
    department: { type: String, required: true },
    designation: { type: String, required: true },
    staffId: { type: String, required: true, unique: true },
    assignedClass: { type: String }, // e.g. "TE - A"
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },

    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Staff', staffSchema);
