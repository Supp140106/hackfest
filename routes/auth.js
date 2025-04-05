const express = require('express');
const router = express.Router();
const Company = require('../models/company'); 


router.post('/signup', async (req, res) => {
    try {
      const { first_name, last_name, ph_num, position, Company_Name, Email_ID } = req.body;
  
      if (!Company_Name) {
        return res.status(400).json({ error: 'Company_Name is required.' });
      }
  
      if (!first_name || !last_name || !ph_num || !position || !Email_ID) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
  
      const role = position.toLowerCase(); 
  
      if (!['manager', 'employee', 'teamlead', 'hr'].includes(role)) {
        return res.status(400).json({ error: 'Invalid position provided.' });
      }
  
      const newCompanyData = {
        Company_Name: Company_Name,
        role: role,
      };
  
      const personDetails = {
        first_name: first_name,
        last_name: last_name,
        Email_ID: Email_ID,
        Phone_Number: ph_num,
      };
  
      if (role === 'employee') {
        newCompanyData.employee = personDetails;
      } else if (role === 'manager') {
        newCompanyData.manager = personDetails;
      } else if (role === 'teamlead') {
        newCompanyData.teamlead = personDetails;
      } else if (role === 'hr') {
        newCompanyData.hr = personDetails;
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