const express = require('express');
const Application = require('../models/applications');
const router = express.Router();

router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const totalApplied = await Application.countDocuments({ userId });
    const rejected = await Application.countDocuments({ userId, status: 'rejected' });
    const accepted = await Application.countDocuments({ userId, status: 'accepted' });
    const pending = await Application.countDocuments({ userId, status: 'pending' });

    const applications = await Application
      .find({ userId })
      .sort({ appliedDate: -1 }); // latest first

    res.json({
      totalApplied,
      rejected,
      accepted,
      pending,
      applications
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

router.post('/apply', async (req, res) => {
  try {
    const { userId, jobId, company, position } = req.body;

    const application = new Application({
      userId,
      jobId,
      company,
      position
    });

    // Prevent duplicate applications
    const existing = await Application.findOne({ userId, jobId });
    if (existing) {
      return res.status(400).json({ message: 'Already applied' });
    }

    const newApplication = new Application({
      userId,
      jobId,
      company,
      position
    });

    await newApplication.save();

    res.status(201).json({ message: 'Application saved' });

  } catch (err) {
    res.status(500).json({ message: 'Error saving application' });
  }
});

module.exports = router;