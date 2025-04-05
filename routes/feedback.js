const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback'); // Assuming your Feedback model is in a 'models' directory

// Route to create a new feedback record with status "completed"
router.post('/create', async (req, res) => {
  try {
    const { employee_name, employee_id, feedbacks, comment } = req.body;

    // Ensure the feedbacks array has exactly 5 elements
    if (!feedbacks || feedbacks.length !== 5) {
      return res.status(400).json({ error: 'Feedbacks array must have exactly 5 elements.' });
    }

    // Validate the stars within each feedback object
    for (const feedback of feedbacks) {
      if (typeof feedback.stars !== 'number' || feedback.stars < 0 || feedback.stars > 5) {
        return res.status(400).json({ error: 'Each feedback must have a "stars" property with a value between 0 and 5.' });
      }
    }

    const newFeedback = new Feedback({
      employee_name,
      employee_id,
      feedbacks,
      comment,
      status: 'completed', // Set the status to "completed"
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback); // Respond with the created feedback and a 201 status code
  } catch (error) {
    console.error('Error creating feedback:', error);
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: 'Failed to create feedback.' });
  }
});

module.exports = router;