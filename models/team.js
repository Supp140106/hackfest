const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    team_id: {
      type: String,
      required: true,
      unique: true
    },
    Team_Name: {
      type: String,
      required: true
    },
    Manager: {
      type: String,
      required: true
    },
    Manager_id: {
      type: String,
      required: true
    },
    domain_of_the_team: {
      type: String,
      required: false
    },
    Employee: [
      {
        employee_name: {
          type: String,
          required: true
        },
        employee_id: {
          type: String,
          required: true,
          unique: true
        }
      }
    ]
  });
  
  // Create a Mongoose model based on the schema
  const Team = mongoose.model('Team', teamSchema);

  module.exports = Team;