
import ProfileHeader from "../components/ProfileHeader";

const Report = () => {
  return (
    <div>
      <ProfileHeader />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Report</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Projects */}
        <div className="stat-card">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Total projects</h2>
            <div className="bg-orange-100 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
              </svg>
            </div>
          </div>
          
          <div className="stat-value">182</div>
          
          <button className="btn btn-primary w-full">
            Add new project
          </button>
        </div>
        
        {/* Team Size */}
        <div className="stat-card">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Team size</h2>
            <div className="bg-green-100 p-2 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          
          <div className="stat-value">14</div>
          
          <button className="btn btn-success w-full">
            Add new members
          </button>
        </div>
        
        {/* Total Working Hours */}
        <div className="stat-card">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total working hours</h2>
              <div className="text-sm text-gray-500">Avg. 148h/ month</div>
            </div>
            <select className="bg-gray-100 border-none text-sm px-2 py-1 rounded">
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          
          <div className="stat-value">37 hours</div>
          
          <div className="h-32 mt-4 relative">
            {/* Simple bar chart */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-end h-full">
              <div className="flex flex-col items-center w-1/7">
                <div className="bg-orange-400 w-6 h-28 rounded-t-sm"></div>
                <div className="text-xs mt-1">Mon</div>
              </div>
              <div className="flex flex-col items-center w-1/7">
                <div className="bg-orange-400 w-6 h-28 rounded-t-sm"></div>
                <div className="text-xs mt-1">Tue</div>
              </div>
              <div className="flex flex-col items-center w-1/7">
                <div className="bg-orange-400 w-6 h-28 rounded-t-sm"></div>
                <div className="text-xs mt-1">Wed</div>
              </div>
              <div className="flex flex-col items-center w-1/7">
                <div className="bg-orange-400 w-6 h-28 rounded-t-sm"></div>
                <div className="text-xs mt-1">Thu</div>
              </div>
              <div className="flex flex-col items-center w-1/7">
                <div className="bg-orange-400 w-6 h-16 rounded-t-sm"></div>
                <div className="text-xs mt-1">Fri</div>
              </div>
              <div className="flex flex-col items-center w-1/7">
                <div className="bg-orange-400 w-6 h-8 rounded-t-sm"></div>
                <div className="text-xs mt-1">Sat</div>
              </div>
              <div className="flex flex-col items-center w-1/7">
                <div className="bg-yellow-200 w-6 h-28 rounded-t-sm"></div>
                <div className="text-xs mt-1">Sun</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Progress */}
      <div className="chart-container mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Project progress</h2>
        
        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-1 bg-gray-100 rounded text-sm font-medium">February</button>
          <button className="px-4 py-1 bg-gray-100 rounded text-sm font-medium">March</button>
          <button className="px-4 py-1 bg-gray-100 rounded text-sm font-medium">April</button>
        </div>
        
        <div className="h-32 relative mt-8">
          {/* Gantt chart-like display */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="border-b border-gray-200 py-2 flex items-center">
              <span className="w-1/4 text-sm text-gray-700">Resources check</span>
              <div className="w-3/4 flex">
                <div className="w-1/3 bg-orange-200 h-6 rounded-md"></div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 py-2 flex items-center">
              <span className="w-1/4 text-sm text-gray-700">Participants</span>
              <div className="w-3/4 flex">
                <div className="w-1/3 ml-1/3 bg-blue-200 h-6 rounded-md"></div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 py-2 flex items-center">
              <span className="w-1/4 text-sm text-gray-700">SWOT analysis</span>
              <div className="w-3/4 flex">
                <div className="w-1/3 ml-2/3 bg-green-200 h-6 rounded-md"></div>
              </div>
            </div>
            
            <div className="py-2 flex items-center">
              <span className="w-1/4 text-sm text-gray-700">Design research</span>
              <div className="w-3/4 flex">
                <div className="w-1/6 ml-2/3 bg-yellow-200 h-6 rounded-md"></div>
                <div className="w-1/4 ml-1/12 bg-purple-200 h-6 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Revenue */}
      <div className="chart-container mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Project revenue</h2>
            <div className="text-sm text-gray-500">Avg. $3,000/ month</div>
          </div>
          <select className="bg-gray-100 border-none text-sm px-2 py-1 rounded">
            <option>Year</option>
            <option>Month</option>
          </select>
        </div>
        
        <div className="text-3xl font-bold flex items-center">
          <span className="text-gray-500">+</span> $12,856.14
        </div>
        
        <div className="h-40 relative mt-4">
          {/* Bar chart for revenue */}
          <div className="absolute bottom-0 left-0 w-full flex justify-between items-end h-full">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => (
              <div key={index} className="flex flex-col items-center" style={{ width: "7%" }}>
                <div 
                  className={`w-full ${index % 2 === 0 ? "bg-green-400" : "bg-purple-400"} rounded-t-sm`}
                  style={{ height: `${Math.floor(Math.random() * 80) + 20}px` }}
                ></div>
                <div className="text-xs mt-1">{month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Project Categories */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Project categories</h2>
          <button className="text-blue-500 text-sm font-medium flex items-center">
            See more
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="category-card">
            <div className="category-icon category-research">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>
            <h3 className="font-medium">Research</h3>
          </div>
          
          <div className="category-card">
            <div className="category-icon category-marketing">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
            </div>
            <h3 className="font-medium">Marketing</h3>
          </div>
          
          <div className="category-card">
            <div className="category-icon category-operations">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </div>
            <h3 className="font-medium">Operations</h3>
          </div>
          
          <div className="category-card">
            <div className="category-icon category-customers">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="font-medium">Customers</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
