const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    Task_Name: {
        type: String,
        required: true,
    },
    Team_Name: {
        type: String,
        required: true,
    },
    Assigned_To: {
        type: String,
        required: true,
    },
    Add_others: {
        type: String,
        required: true,
    },
    Select_Priority: {
        type: String,
        required: true,
    },
    Deadline: {
        type: Date,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    Task_Related_Document: {
        type: Boolean,
        required: true,
    },

    Daily_Office_Hours: {
        type: Number,
        required: true, 
    }
});

const Todo = mongoose.model('Task', taskSchema);

module.exports = Task; 
