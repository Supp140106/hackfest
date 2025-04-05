const router = require('express').Router();
const Company = require('../models/company'); // Assuming you have a Company model defined
const Team = require('../models/team');


router.post('/api/teams', async (req, res) => {
    try {
        const { team_id, Team_Name, Manager, domain_of_the_team, Employee: employeeNames } = req.body;
    
        // Step 1: Loop through each name and search in Company collection
        const employeeData = [];
        const notFound = [];
    
        for (const { first_name, last_name } of employeeNames) {
          const person = await Company.findOne({
            role: 'employee',
            'employee.first_name': first_name,
            'employee.last_name': last_name
          });
    
          if (person) {
            const emp = person.employee;
            employeeData.push({
              employee_name: `${emp.first_name} ${emp.last_name}`,
              employee_id: emp.Email_ID // or Phone_Number as unique ID (adjust as needed)
            });
          } else {
            notFound.push({ first_name, last_name });
          }
        }
    
        if (notFound.length > 0) {
          return res.status(400).json({
            error: 'Some employees were not found or not marked as "employee"',
            notFound
          });
        }
    
        const newTeam = new Team({
          team_id,
          Team_Name,
          Manager,
          domain_of_the_team,
          Employee: employeeData
        });
    
        const savedTeam = await newTeam.save();
    
        res.status(201).json({
          message: 'Team created successfully!',
          team: savedTeam
        });
    
      } catch (err) {
        console.error('Error creating team:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
      }}
 );

  module.exports = router;