
import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";

const Tasks = () => {
  // Sample tasks data
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      name: "Finish monthly reporting", 
      date: "April 5,2025", 
      status: "pending", // pending, in-progress, paused, completed
      priority: "high",
      tag: "research"
    },
    { 
      id: 2, 
      name: "Report signing", 
      date: "April 5,2025", 
      status: "pending", 
      priority: "high",
      tag: "operations"
    },
    { 
      id: 3, 
      name: "Market overview keynote", 
      date: "April 5,2025", 
      status: "pending", 
      priority: "medium",
      tag: "insights"
    },
    { 
      id: 4, 
      name: "Quarterly planning", 
      date: "April 10, 2025", 
      status: "pending", 
      priority: "low",
      tag: "strategy"
    },
  ]);

  const handleStartTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: "in-progress" } : task
    ));
  };

  const handlePauseTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: "paused" } : task
    ));
  };

  const handleSubmitTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: "completed" } : task
    ));
  };

  return (
    <div>
      <ProfileHeader />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold">My Tasks</h1>
        <p className="text-xl text-gray-600">Manage your daily tasks</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {tasks.map(task => (
          <div key={task.id} className="project-card">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{task.name}</h3>
                <div className="mt-2">
                  <span className={`tag tag-${task.tag}`}>{task.tag}</span>
                  <span className={`priority-badge priority-${task.priority}-badge`}>{task.priority} priority</span>
                </div>
              </div>
              <div>
                <p className="text-gray-500">{task.date}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-4">
              {task.status === "pending" && (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleStartTask(task.id)}
                >
                  Start Task
                </button>
              )}
              
              {task.status === "in-progress" && (
                <>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handlePauseTask(task.id)}
                  >
                    Pause Task
                  </button>
                  <button 
                    className="btn btn-success"
                    onClick={() => handleSubmitTask(task.id)}
                  >
                    Submit Task
                  </button>
                </>
              )}
              
              {task.status === "paused" && (
                <>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleStartTask(task.id)}
                  >
                    Resume Task
                  </button>
                  <button 
                    className="btn btn-success"
                    onClick={() => handleSubmitTask(task.id)}
                  >
                    Submit Task
                  </button>
                </>
              )}
              
              {task.status === "completed" && (
                <span className="badge-yellow rounded-lg pl-3 pr-3">Verification Pending</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
