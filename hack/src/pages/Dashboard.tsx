
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calendar data
  const currentMonth = "April 2025";
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dates = [
    { day: 27, month: "previous" },
    { day: 28, month: "previous" },
    { day: 29, month: "previous" },
    { day: 30, month: "previous" },
    { day: 31, month: "previous" },
    { day: 1, month: "current" },
    { day: 2, month: "current" },
    { day: 3, month: "current" },
    { day: 4, month: "current" },
    { day: 5, month: "current" , active: true},
    { day: 6, month: "current" },
    { day: 7, month: "current" },
    { day: 8, month: "current" },
    { day: 9, month: "current" },
    { day: 10, month: "current" },
    { day: 11, month: "current" },
    { day: 12, month: "current" },
    { day: 13, month: "current" },
    { day: 14, month: "current" },
    { day: 15, month: "current" },
    { day: 16, month: "current" },
    { day: 17, month: "current" },
    { day: 18, month: "current" },
    { day: 19, month: "current" },
    { day: 20, month: "current" },
    { day: 21, month: "current" },
    { day: 22, month: "current" },
    { day: 23, month: "current" },
    { day: 24, month: "current" },
    { day: 25, month: "current" },
    { day: 26, month: "current" },
    { day: 27, month: "current" },
    { day: 28, month: "current" },
    { day: 29, month: "current" },
    { day: 30, month: "current" },
  ];

  // Urgent tasks
  const urgentTasks = [
    { id: 1, name: "Finish monthly reporting", date: "Today" },
    { id: 2, name: "Report signing", date: "Today" },
    { id: 3, name: "Market overview keynote", date: "Today" },
  ];

  const handleUrgentTaskClick = () => {
    navigate('/tasks');
  };

  return (
    <div>
      <ProfileHeader />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Welcome, IIT-DHN!</h1>
        <p className="text-xl text-gray-600">Here is your agenda for today</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Calendar */}
        <div className="calendar">
          <div className="calendar-header">
            <h2 className="text-xl font-semibold">{currentMonth}</h2>
            <div className="flex">
              <button className="p-1 bg-gray-100 rounded-full mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="p-1 bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="calendar-days">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="font-semibold text-sm text-gray-600">
                {day}
              </div>
            ))}
            
            {dates.map((date, index) => (
              <div 
                key={index} 
                className={`calendar-day ${date.month !== 'current' ? 'text-gray-400' : ''} ${date.active ? 'active' : ''}`}
                onClick={() => navigate('/calendar')}
              >
                {date.day}
              </div>
            ))}
          </div>
        </div>
        
        {/* Urgent Tasks */}
        <div className="urgent-tasks">
          <h2 className="text-xl font-semibold mb-4">Urgent tasks</h2>
          
          {urgentTasks.map(task => (
            <div key={task.id} className="task-item" onClick={handleUrgentTaskClick}>
              <div className="task-checkbox"></div>
              <div className="flex-1">
                <p>{task.name}</p>
              </div>
              <div className="date-badge">
                {task.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
