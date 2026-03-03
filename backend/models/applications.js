const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  jobId: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);