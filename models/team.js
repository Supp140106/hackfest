const mongoose = require('mongoose');
const { type } = require('os');
const teamSchema = new mongoose.Schema({
    project_name: {
        type: String,
        required: true,
    },

    assigned_manager:{
        type: String,
        required: true,
    },

    project_description: {
        type: String,
        required: true,
    },

    deadline_date:{
        type: Date,
        required: true,
    },

    members_count: {
        type: Number,
        required: true,
    },

    teamMembers:{
        employee1 : {
            name:{
                type: String,
                required: true,
            },

            employee_role:{
                type: String,
                required: true,
            },

            tasks_assigned:{
                type: String,
                required: true,
            },

            email:{
                type: String,
                required: true,
            },
            phone:{
                type: String,
                required: true,
            },    
        }
    }

});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team; 