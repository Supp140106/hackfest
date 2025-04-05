const express = require('express');
const router = express.Router();
const Company = require('../models/company'); 


router.post('/signup', async (req, res) => {
  try {
      const { first_name, last_name, ph_num, position, Company_Name, Email_ID, EmployeeID } = req.body;

      if (!Company_Name) {
          return res.status(400).json({ error: 'Company_Name is required.' });
      }

      if (!first_name || !last_name || !ph_num || !position || !Email_ID || !EmployeeID) {
          return res.status(400).json({ error: 'Missing required fields.' });
      }

      const newCompanyData = {
          Company_Name: Company_Name,
          role: "employee",
      };

      const personDetails = {
          first_name: first_name,
          last_name: last_name,
          Email_ID: Email_ID,
          Phone_Number: ph_num,
          employee_id: EmployeeID,
          position: position,
      };

      if (newCompanyData.role === 'employee') {
          newCompanyData.employee = personDetails;
      }

      const newCompany = new Company(newCompanyData);
      const savedCompany = await newCompany.save();

      res.status(201).json(savedCompany);
  } catch (error) {
      console.error('Error creating company:', error);
      res.status(500).json({ error: 'Failed to create company.' });
  }
});




  router.get('/login', async (req, res) => {
    try {
      const { identifier } = req.body;
  
      if (!identifier) {
        return res.status(400).json({ error: 'Please provide either phone number or email.' });
      }
  
     
      const company = await Company.findOne({
        $or: [
          { 'employee.Phone_Number': identifier },
          { 'employee.Email_ID': identifier },
          { 'manager.Phone_Number': identifier },
          { 'manager.Email_ID': identifier },
          { 'teamlead.Phone_Number': identifier },
          { 'teamlead.Email_ID': identifier },
          { 'hr.Phone_Number': identifier },
          { 'hr.Email_ID': identifier },
        ],
      });
  
      if (company) {
        res.status(200).json(company);
      } else {
        res.status(401).json({ error: 'Invalid phone number or email.' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Login failed.' });
    }
  });



  module.exports = router;