import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ProjectOverview = () => {
  const currentMonth = "April 2025";
  const daysOfWeek = [ "MON", "TUE", "WED", "THU", "FRI", "SAT" , "SUN" ];
  const dates = [
    { day: 31, month: "previous" },
    { day: 1, month: "current" , performance: "good" },
    { day: 2, month: "current" ,performance: "good"},
    { day: 3, month: "current" , performance: "average" },
    { day: 4, month: "current", performance: "good" },
    { day: 5, month: "current", performance: "good" , active: true},
    { day: 6, month: "current", performance: "good" },
    { day: 7, month: "current", performance: "good" },
    { day: 8, month: "current", performance: "poor" },
    { day: 9, month: "current", performance: "average" },
    { day: 10, month: "current", performance: "good" },
    { day: 11, month: "current", performance: "good" },
    { day: 12, month: "current", performance: "average" },
    { day: 13, month: "current", performance: "good" },
    { day: 14, month: "current", performance: "good" },
    { day: 15, month: "current", performance: "poor" },
    { day: 16, month: "current", performance: "average" },
    { day: 17, month: "current", performance: "good" },
    { day: 18, month: "current", performance: "good" },
    { day: 19, month: "current", performance: "average" },
    { day: 20, month: "current", performance: "good" },
    { day: 21, month: "current", performance: "poor" },
    { day: 22, month: "current", performance: "average" },
    { day: 23, month: "current", performance: "good" },
    { day: 24, month: "current", performance: "good" },
    { day: 25, month: "current", performance: "average" },
    { day: 26, month: "current", performance: "good" },
    { day: 27, month: "current", performance: "good" },
    { day: 28, month: "current", performance: "poor" },
    { day: 29, month: "current", performance: "average" },
    { day: 30, month: "current", performance: "good" },
    { day: 1, month: "previous" },
    { day: 2, month: "previous" },
    { day:3, month: "previous" },
  ];

  const monthlyData = [
    { month: 'Jan', performance: 65, tasksCompleted: 18 },
    { month: 'Feb', performance: 75, tasksCompleted: 20 },
    { month: 'Mar', performance: 82, tasksCompleted: 24 },
    { month: 'Apr', performance: 78, tasksCompleted: 22 },
  ];

  const taskPerformanceData = [
    { category: 'Research', onTime: 12, delayed: 3 },
    { category: 'Strategy', onTime: 8, delayed: 1 },
    { category: 'Operations', onTime: 16, delayed: 4 },
    { category: 'Insights', onTime: 10, delayed: 2 },
  ];

  return (
    <div className="p-4">
      <ProfileHeader />

      <div className="mb-8">
        <h1 className="text-4xl font-bold">Performance Overview</h1>
        <p className="text-xl text-gray-600">Track your work progress and performance</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Calendar */}
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">Performance Calendar</h2>

          <div className="flex items-center justify-end mb-4 gap-4">
            {["good", "average", "poor"].map((type) => (
              <div key={type} className="flex items-center capitalize">
                <div className={`w-4 h-4 rounded-full border-2 mr-2 ${
                  type === "good" ? "border-green-500" :
                  type === "average" ? "border-yellow-500" :
                  "border-red-500"
                }`}></div>
                <span>{type}</span>
              </div>
            ))}
          </div>

          <div className="calendar">
            <div className="calendar-header flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{currentMonth}</h3>
              <div className="flex">
                <button className="p-1 bg-gray-100 rounded-full mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className="p-1 bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="calendar-days grid grid-cols-7 gap-2 text-center text-sm">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="font-semibold text-gray-600">{day}</div>
              ))}
              {dates.map((date, index) => {
                let borderClass = "";
                if (date.month === "current") {
                  borderClass =
                    date.performance === "good" ? "border-2 border-green-500" :
                    date.performance === "average" ? "border-2 border-yellow-500" :
                    date.performance === "poor" ? "border-2 border-red-500" : "";
                }
                return (
                  <div
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center mx-auto ${date.month !== "current" ? "text-gray-400" : ""} ${date.active ? "bg-green-400 text-white" : ""} ${borderClass} rounded-full`}
                  >
                    {date.day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Monthly Performance Chart */}
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">Monthly Performance Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="performance" stroke="#ff9f56" strokeWidth={2} />
                <Line type="monotone" dataKey="tasksCompleted" stroke="#7e22ce" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Chart */}
        <div className="chart-container">
          <h2 className="text-xl font-semibold mb-4">Task Completion Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" name="Completed On Time" fill="#6f6f99" />
                <Bar dataKey="delayed" name="Delayed" fill="#d7235f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
