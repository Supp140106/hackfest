const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // 🆕 Required for views path
const auth = require("./routes/auth");
const feedback = require("./routes/feedback");
const page = require("./page_router/pagerouting");
const api = require("./api/team");
const Employee = require("./models/Employeetrack");

const app = express();
app.use(express.json());
app.use(cors());

// 🆕 Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Make sure to create a 'views' folder

const MONGODB_URI =
  "mongodb+srv://thenullpointers:Rishu123%40chut@clusteremplyyime.ahv5yqd.mongodb.net/timetracker?retryWrites=true&w=majority&appName=Clusteremplyyime";
const PORT = process.env.PORT || 3000;

const WORK_TIME_UPDATE_INTERVAL_MS = 60 * 1000;
const WORK_TIME_INCREMENT_SECONDS = 60;
const ACTIVITY_THRESHOLD_SECONDS = 70;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    const dbUriParts = MONGODB_URI.split("@");
    const dbHostInfo = dbUriParts.length > 1 ? dbUriParts[1].split("/")[0] : "localhost";
    console.log(`Successfully connected to MongoDB at ${dbHostInfo}`);
    startServer();
    setInterval(updateWorkTimes, WORK_TIME_UPDATE_INTERVAL_MS);
    console.log(`Work time calculation interval: ${WORK_TIME_UPDATE_INTERVAL_MS / 1000} seconds.`);
    console.log(`Activity threshold: ${ACTIVITY_THRESHOLD_SECONDS} seconds.`);
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// 🆕 Basic EJS route for homepage
app.get("/", (req, res) => {
  res.render("index", {
    title: "Time Tracker Dashboard",
    message: "Welcome to Employee Time Tracker",
  });
});

// Routing
app.use("/page", page);
app.use("/auth", auth);
app.use("/feedback", feedback);
app.use("/api", api);

// Activity logging endpoint
app.post("/log_activity", async (req, res) => {
  const { employee_id, event, time } = req.body;
  if (!employee_id || !event || !time) {
    console.warn("Received incomplete activity data:", req.body);
    return res.status(400).send({
      status: "Error",
      message: "Missing employee_id, event, or time",
    });
  }

  try {
    await Employee.findOneAndUpdate(
      { employee_id },
      { $set: { last_activity_time: time } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).send({ status: "Logged successfully" });
  } catch (error) {
    console.error(`Error logging activity for employee ${employee_id}:`, error.message);
    res.status(500).send({
      status: "Error",
      message: "Database operation failed while logging activity",
    });
  }
});

// Single employee work time
app.get("/work_time/:employee_id", async (req, res) => {
  const { employee_id } = req.params;
  try {
    const employee = await Employee.findOne({ employee_id });
    if (employee) {
      res.status(200).send({
        employee_id: employee.employee_id,
        last_activity_time: employee.last_activity_time,
        last_activity_timestamp: new Date(employee.last_activity_time * 1000).toLocaleString(),
        total_worked_seconds: employee.total_worked_time,
        total_worked_minutes: Math.round(employee.total_worked_time / 60),
        total_worked_hours: (employee.total_worked_time / 3600).toFixed(2),
        db_updated_at: employee.updatedAt,
      });
    } else {
      res.status(404).send({ status: "Error", message: "Employee ID not found" });
    }
  } catch (error) {
    console.error(`Error fetching work time for employee ${employee_id}:`, error.message);
    res.status(500).send({
      status: "Error",
      message: "Database query failed while fetching work time",
    });
  }
});

// All employee summary
app.get("/work_time", async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ employee_id: 1 });
    const summary = employees.map((employee) => ({
      employee_id: employee.employee_id,
      last_activity_timestamp: new Date(employee.last_activity_time * 1000).toLocaleString(),
      total_worked_minutes: Math.round(employee.total_worked_time / 60),
      db_updated_at: employee.updatedAt,
    }));
    res.status(200).send(summary);
  } catch (error) {
    console.error("Error fetching all work times:", error.message);
    res.status(500).send({
      status: "Error",
      message: "Database query failed while fetching all work times",
    });
  }
});

// Periodic work time update function
async function updateWorkTimes() {
  const now = Math.floor(Date.now() / 1000);
  const activityThresholdTime = now - ACTIVITY_THRESHOLD_SECONDS;

  try {
    const activeEmployees = await Employee.find({
      last_activity_time: { $gte: activityThresholdTime },
    });

    if (activeEmployees.length === 0) return;

    console.log(
      `Found ${activeEmployees.length} employees active since ${new Date(activityThresholdTime * 1000).toLocaleTimeString()}.`
    );

    const bulkOps = activeEmployees.map((employee) => ({
      updateOne: {
        filter: { _id: employee._id },
        update: { $inc: { total_worked_time: WORK_TIME_INCREMENT_SECONDS } },
      },
    }));

    const result = await Employee.bulkWrite(bulkOps);
    console.log(`Work time updated in DB for ${result.modifiedCount} employees.`);
  } catch (error) {
    // Optionally log error
  }
}

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("Error during MongoDB connection closing:", err);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION! Shutting down...");
  console.error("Reason:", reason);
  process.exit(1);
});
