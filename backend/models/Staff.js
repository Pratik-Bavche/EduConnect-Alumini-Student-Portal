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
    assignedYear: { type: String }, // e.g. "1st Year", "2nd Year", "3rd Year", "4th Year"
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },

    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Staff', staffSchema);
