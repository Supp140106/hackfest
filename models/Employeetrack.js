const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employee_id: {
      // The ID from the client script
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    last_activity_time: {
      // Unix timestamp in seconds
      type: Number,
      required: true,
      default: () => Math.floor(Date.now() / 1000),
      index: true,
    },
    total_worked_time: {
      // Total time worked in seconds
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
