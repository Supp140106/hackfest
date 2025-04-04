const mongoose = require('mongoose');
const { type } = require('os');


const feedbackSchema = new mongoose.Schema({
    employee_name: {
      type: String,
      required: true,
    },
    
    employee_id:{
        type: String,
        required: true,
    }
    feedbacks: {
      type: [
        {
          stars: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
          },
        },
      ],
      validate: {
        validator: function (v) {
          return v.length === 5;
        },
        message: props => `Feedbacks array must have exactly 5 elements, but got ${props.value.length}`,
      },
    },
  
    comment: {
      type: String,
      required: true,
    },
  
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  
    status: {
      type: String,
      required: true,
    },
  });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);
  module.exports = Feedback;