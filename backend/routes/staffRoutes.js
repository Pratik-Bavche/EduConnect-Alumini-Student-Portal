import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// @route   GET /api/staff/pending-students
// @desc    Get all pending student requests
// @access  Staff
router.get('/pending-students', async (req, res) => {
    try {
        // Fetch students who are NOT verified
        // You might want to filter by year here if you pass it in query / param,
        // but for now fetch all and let frontend filter or filter here if easy.
        // Frontend logic does filtering by Year/Div. Admin assigns year to staff.
        // So fetching all pending is okay, then frontend filters. 
        // OR better: filter here if req.query.year is present.

        const query = { isVerified: false };
        // if (req.query.year) { query.year = req.query.year } // Need to align Schema "year" format (e.g. "3rd Year" vs "TE")

        const students = await Student.find(query);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/staff/approve-student/:id
// @desc    Approve student
// @access  Staff
router.put('/approve-student/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        student.isVerified = true;
        student.status = 'approved'; // If Student model has status field, otherwise just isVerified

        await student.save();
        res.json({ message: 'Student approved successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/staff/reject-student/:id
// @desc    Reject student
// @access  Staff
router.put('/reject-student/:id', async (req, res) => {
    try {
        // Implement rejection logic (delete or set status rejected)
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Option: Delete or Mark Rejected
        await Student.findByIdAndDelete(req.params.id); // For now delete to allow re-register or clean up

        res.json({ message: 'Student request rejected/removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
