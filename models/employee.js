const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    Company_Name:{
        type : String,
        required: true,
    },

    role:{
        type: String,
        required: true,
    },

    first_name:{
        type: String,
        required: true,
    },
    
    last_name:{
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
});