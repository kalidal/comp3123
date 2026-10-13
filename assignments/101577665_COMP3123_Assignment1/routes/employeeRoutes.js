const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const verifyToken = require('../middleware/auth');

// Protect all employee routes
router.use(verifyToken);

// GET /api/v1/emp/employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({ user: req.user.userId });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
});

// POST /api/v1/emp/employees
router.post('/employees', async (req, res) => {
    try {
        const employee = new Employee({
            ...req.body,
            user: req.user.userId
        });
        await employee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
});

// GET /api/v1/emp/employees/{eid}
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.eid, user: req.user.userId });
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found or unauthorized' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
});

// PUT /api/v1/emp/employees/{eid}
router.put('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate(
            { _id: req.params.eid, user: req.user.userId },
            req.body,
            { new: true, runValidators: true }
        );
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found or unauthorized' });
        }
        res.status(200).json({ message: 'Employee updated successfully.', employee });
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
});

// DELETE /api/v1/emp/employees?eid=xxx
router.delete('/employees', async (req, res) => {
    try {
        const eid = req.query.eid;
        if (!eid) {
            return res.status(400).json({ status: false, message: 'Employee ID query parameter (eid) is required' });
        }
        const employee = await Employee.findOneAndDelete({ _id: eid, user: req.user.userId });
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found or unauthorized' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ status: false, message: err.message });
    }
});

module.exports = router;