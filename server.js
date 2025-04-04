
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To enable Cross-Origin Resource Sharing

// --- Configuration ---
// Read MongoDB URI and Port from environment variables or use defaults
// ** This line now correctly reads from your .env file **
const MONGODB_URI ='mongodb+srv://thenullpointers:Rishu123%40chut@clusteremplyyime.ahv5yqd.mongodb.net/timetracker?retryWrites=true&w=majority&appName=Clusteremplyyime'
const PORT = process.env.PORT || 3000; // Uses port from .env or defaults to 3000

// Constants for tracking logic
const WORK_TIME_UPDATE_INTERVAL_MS = 60 * 1000; // 1 minute in milliseconds
const WORK_TIME_INCREMENT_SECONDS = 60; // Increment work time by 60 seconds
const ACTIVITY_THRESHOLD_SECONDS = 70; // How recent activity must be (in seconds) to be considered "working"

// --- MongoDB Connection ---
// ** This block uses the MONGODB_URI defined above (from .env) **
mongoose.connect(MONGODB_URI)
    .then(() => {
        // Log successful connection (masking user/pass if present in URI)
        const dbUriParts = MONGODB_URI.split('@');
        const dbHostInfo = dbUriParts.length > 1 ? dbUriParts[1].split('/')[0] : 'localhost'; // Extract host info safely
        console.log(`Successfully connected to MongoDB at ${dbHostInfo}`);
        // Start the server and the periodic update only after successful DB connection
        startServer();
        setInterval(updateWorkTimes, WORK_TIME_UPDATE_INTERVAL_MS);
        console.log(`Work time calculation interval: ${WORK_TIME_UPDATE_INTERVAL_MS / 1000} seconds.`);
        console.log(`Activity threshold: ${ACTIVITY_THRESHOLD_SECONDS} seconds.`);
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
        // ** If you still get certificate errors here, troubleshoot the CA certs / network / bun issues **
        process.exit(1); // Exit if database connection fails
    });

// --- Mongoose Schema and Model ---
const employeeSchema = new mongoose.Schema({
    employee_id: { // The ID from the client script
        type: String,
        required: true,
        unique: true,
        index: true
    },
    last_activity_time: { // Unix timestamp in seconds
        type: Number,
        required: true,
        default: () => Math.floor(Date.now() / 1000),
        index: true
    },
    total_worked_time: { // Total time worked in seconds
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Employee = mongoose.model('Employee', employeeSchema);

// --- API Endpoints ---

// Endpoint to receive activity logs from the client
app.post('/log_activity', async (req, res) => {
    const { employee_id, event, time } = req.body;

    // Basic validation
    if (!employee_id || !event || !time) {
        console.warn("Received incomplete activity data:", req.body);
        return res.status(400).send({ status: "Error", message: "Missing employee_id, event, or time" });
    }

    try {
        // Find the employee by employee_id and update their last_activity_time.
        // If the employee doesn't exist, create (upsert) a new document.
        await Employee.findOneAndUpdate(
            { employee_id: employee_id }, // Filter condition
            { $set: { last_activity_time: time } }, // Update operation
            {
                new: true, // Return the updated document (optional here)
                upsert: true, // Create if doesn't exist
                setDefaultsOnInsert: true // Apply schema defaults on creation
            }
        );
        // Send success response
        res.status(200).send({ status: "Logged successfully" });

    } catch (error) {
        console.error(`Error logging activity for employee ${employee_id}:`, error.message);
        res.status(500).send({ status: "Error", message: "Database operation failed while logging activity" });
    }
});

// Endpoint to get work time for a specific employee
app.get('/work_time/:employee_id', async (req, res) => {
    const { employee_id } = req.params;

    try {
        // Find the employee by the custom employee_id field
        const employee = await Employee.findOne({ employee_id: employee_id });

        if (employee) {
            // Send detailed data if employee found
            res.status(200).send({
                employee_id: employee.employee_id,
                last_activity_time: employee.last_activity_time,
                last_activity_timestamp: new Date(employee.last_activity_time * 1000).toLocaleString(),
                total_worked_seconds: employee.total_worked_time,
                total_worked_minutes: Math.round(employee.total_worked_time / 60),
                total_worked_hours: (employee.total_worked_time / 3600).toFixed(2),
                db_updated_at: employee.updatedAt
            });
        } else {
            // Send 404 if employee not found
            res.status(404).send({ status: "Error", message: "Employee ID not found" });
        }
    } catch (error) {
        console.error(`Error fetching work time for employee ${employee_id}:`, error.message);
        res.status(500).send({ status: "Error", message: "Database query failed while fetching work time" });
    }
});

// Endpoint to get a summary of work times for all employees
app.get('/work_time', async (req, res) => {
    try {
        // Fetch all employees, optionally sort them
        const employees = await Employee.find({}).sort({ employee_id: 1 });

        // Map data to a summary format
        const summary = employees.map(employee => ({
            employee_id: employee.employee_id,
            last_activity_timestamp: new Date(employee.last_activity_time * 1000).toLocaleString(),
            total_worked_minutes: Math.round(employee.total_worked_time / 60),
            db_updated_at: employee.updatedAt
        }));
        res.status(200).send(summary);
    } catch (error) {
        console.error("Error fetching all work times:", error.message);
        res.status(500).send({ status: "Error", message: "Database query failed while fetching all work times" });
    }
});


// --- Periodic Work Time Calculation Function ---
async function updateWorkTimes() {
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const activityThresholdTime = now - ACTIVITY_THRESHOLD_SECONDS; // Cutoff time for recent activity

    // console.log(`\n--- Running Work Time Update (DB) at ${new Date().toLocaleString()} ---`);

    try {
        // Find employees whose last activity was recent enough
        const activeEmployees = await Employee.find({
            last_activity_time: { $gte: activityThresholdTime }
        });

        if (activeEmployees.length === 0) {
            // console.log("No employees were active recently enough to update work time.");
            // console.log("--- Work Time Update Complete ---");
            return; // No updates needed
        }

        console.log(`Found ${activeEmployees.length} employees active since ${new Date(activityThresholdTime * 1000).toLocaleTimeString()}.`);

        // Prepare bulk update operations to increment work time
        const bulkOps = activeEmployees.map(employee => ({
            updateOne: {
                filter: { _id: employee._id }, // Use the unique MongoDB document ID
                update: { $inc: { total_worked_time: WORK_TIME_INCREMENT_SECONDS } } // Increment the work time
            }
        }));

        // Execute the bulk write operation
        const result = await Employee.bulkWrite(bulkOps);
        console.log(`Work time updated in DB for ${result.modifiedCount} employees.`);

    } catch (error) {
        console.error("Error during periodic work time update:", error.message);
    }
    // console.log("--- Work Time Update Complete ---\n");
}

// --- Start Server Function ---
// This function is called after the database connection is successful
function startServer() {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}

// --- Graceful Shutdown Handling ---
// Function to close MongoDB connection gracefully
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
        process.exit(0); // Exit cleanly
    } catch (err) {
        console.error('Error during MongoDB connection closing:', err);
        process.exit(1); // Exit with error code
    }
};

// Listen for termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT')); // Ctrl+C
process.on('SIGTERM', () => gracefulShutdown('SIGTERM')); // Docker stop, etc.

// --- Global Error Handling ---
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message, err.stack);
  // ** If the error is 'UNABLE_TO_GET_ISSUER_CERT', troubleshoot CA certs / network / bun issues **
  process.exit(1); // Exit with error code
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error('Reason:', reason);
  process.exit(1); // Exit with error code
});