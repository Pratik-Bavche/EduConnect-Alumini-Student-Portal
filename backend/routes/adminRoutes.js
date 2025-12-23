import express from 'express';
import Staff from '../models/Staff.js';
// import { protect } from '../middleware/authMiddleware'; // Assuming middleware exists or we skip for MVP

const router = express.Router();

// @route   GET /api/admin/pending-staff
// @desc    Get all pending staff requests
// @access  Admin
router.get('/pending-staff', async (req, res) => {
    try {
        const staff = await Staff.find({ status: 'pending' });
        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/admin/approve-staff/:id
// @desc    Approve staff and assign year
// @access  Admin
router.put('/approve-staff/:id', async (req, res) => {
    const { assignedYear } = req.body;
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        staff.status = 'approved';
        staff.isVerified = true;
        staff.assignedYear = assignedYear;
        // staff.assignedClass = assignedClass; // If we use this too

        // Also update the 'assignedClass' field for backward compatibility/display 
        // Logic: if assignedYear is "3rd Year", maybe assignedClass is "TE" or just store year.
        // For now, simpler is keeping it consistent.

        await staff.save();
        res.json({ message: 'Staff approved successfully', staff });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/admin/reject-staff/:id
// @desc    Reject staff request
// @access  Admin
router.put('/reject-staff/:id', async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        staff.status = 'rejected';
        await staff.save();
        res.json({ message: 'Staff rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
