const mongoose = require('mongoose');

// Define a reusable sub-schema for people
const personSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    employee_id: { type: String, required: true },  
    last_name: { type: String, required: true },
    Email_ID: { type: String, required: true },
    Phone_Number: { type: String, required: true },
    position: { type: String }, // only for employee; optional for others
}, { _id: false });

const companySchema = new mongoose.Schema({
    Company_Name: {
        type: String,
        required: true,
    },
    role: { // manager, employee, teamLead, HR
        type: String,
        required: true,
        enum: ['manager', 'employee', 'teamLead', 'HR'], // optional validation
    },
    employee: personSchema,
    manager: personSchema,
    teamlead: personSchema,
    hr: personSchema
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;