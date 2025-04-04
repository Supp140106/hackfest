const mongoose = require ('mongoose');{
const companySchema = new mongoose.Schema({
    Company_Name: {
        type: String,
        required: true,
    },

    Company_ID: {
        type: String,
        required: true,
    },

     // manager // employee // teamLead // HR
    role:{ 
        type: String,
        required: true,
    },

    employee:{
        first_name : {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        Email_ID: {
            type: String,
            required: true,
        },
        Phone_Number: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
    },

    manager:{
        first_name : {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        Email_ID: {
            type: String,
            required: true,
        },
        Phone_Number: {
            type: String,
            required: true,
        },

    },

    teamlead:{
        first_name : {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        Email_ID: {
            type: String,
            required: true,
        },
        Phone_Number: {
            type: String,
            required: true,
        },

    },

    hr:{
        first_name : {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        Email_ID: {
            type: String,
            required: true,
        },
        Phone_Number: {
            type: String,
            required: true,
        },

    }

});

const Company = mongoose.model('Company', companySchema);
module.exports = Company; // Export the model correctly
}