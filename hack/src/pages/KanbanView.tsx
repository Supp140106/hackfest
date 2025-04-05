
import ProfileHeader from "../components/ProfileHeader";

const KanbanView = () => {
  // Kanban data
  const columns = [
    {
      id: 1,
      title: "TO DO",
      tasks: [
        {
          id: 1,
          title: "Survey design",
          tag: { text: "Research", color: "tag-research" },
          priority: { text: "Medium priority", type: "medium" },
          users: ["/lovable-uploads/0a9e6a1b-60a4-451d-b9e3-3d663db9557c.png", "/lovable-uploads/8ebb3fef-d232-4f86-b41a-94d580f66d89.png"]
        },
        {
          id: 2,
          title: "SWOT analysis",
          tag: { text: "Strategy", color: "tag-strategy" },
          priority: { text: "High priority", type: "high" },
          users: ["/lovable-uploads/8ebb3fef-d232-4f86-b41a-94d580f66d89.png"]
        },
        {
          id: 3,
          title: "Structure design",
          tag: { text: "Operations", color: "tag-operations" },
          priority: { text: "Low priority", type: "low" },
          users: ["/lovable-uploads/0a9e6a1b-60a4-451d-b9e3-3d663db9557c.png", "/lovable-uploads/8ebb3fef-d232-4f86-b41a-94d580f66d89.png", "/lovable-uploads/a652ee74-1f34-40ea-843e-61d4cc71a443.png"]
        }
      ]
    },
    {
      id: 2,
      title: "IN PROGRESS",
      tasks: [
        {
          id: 4,
          title: "Focus group #5",
          tag: { text: "Research", color: "tag-research" },
          priority: { text: "High priority", type: "high" },
          users: ["/lovable-uploads/0a9e6a1b-60a4-451d-b9e3-3d663db9557c.png", "/lovable-uploads/ff1b51dd-a272-4e94-b67d-5035cc5cca51.png"]
        },
        {
          id: 5,
          title: "Surveys set-up",
          tag: { text: "Strategy", color: "tag-strategy" },
          priority: { text: "Medium priority", type: "medium" },
          users: ["/lovable-uploads/0a9e6a1b-60a4-451d-b9e3-3d663db9557c.png", "/lovable-uploads/8ebb3fef-d232-4f86-b41a-94d580f66d89.png", "/lovable-uploads/a652ee74-1f34-40ea-843e-61d4cc71a443.png"]
        },
        {
          id: 6,
          title: "Weekly round-up",
          tag: { text: "Operations", color: "tag-operations" },
          priority: { text: "High priority", type: "high" },
          users: ["/lovable-uploads/0a9e6a1b-60a4-451d-b9e3-3d663db9557c.png", "/lovable-uploads/ff1b51dd-a272-4e94-b67d-5035cc5cca51.png"]
        }
      ]
    },
    {
      id: 3,
      title: "DONE",
      tasks: [
        {
          id: 7,
          title: "Focus group #3",
          tag: { text: "Research", color: "tag-research" },
          priority: { text: "High priority", type: "high" },
          users: ["/lovable-uploads/924be514-d335-4305-87b9-6cfc2974e705.png", "/lovable-uploads/ff1b51dd-a272-4e94-b67d-5035cc5cca51.png"]
        },
        {
          id: 8,
          title: "Q2 results analysis",
          tag: { text: "Insights", color: "tag-insights" },
          priority: { text: "Low priority", type: "low" },
          users: ["/lovable-uploads/924be514-d335-4305-87b9-6cfc2974e705.png"]
        }
      ]
    }
  ];

  const getPriorityDot = (type: string) => {
    switch(type) {
      case "high": return "priority-high";
      case "medium": return "priority-medium";
      case "low": return "priority-low";
      default: return "";
    }
  };

  return (
    <div>
      <ProfileHeader />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Project overview / Market research 2024 / Kanban view</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(column => (
          <div key={column.id} className="kanban-column">
            <h2 className="text-xl font-bold mb-4">{column.title}</h2>
            
            {column.tasks.map(task => (
              <div key={task.id} className="kanban-card">
                <div className="kanban-card-header">
                  <h3 className="font-medium">{task.title}</h3>
                  <button className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className={`tag ${task.tag.color}`}>#{task.tag.text}</span>
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full ${getPriorityDot(task.priority.type)} mr-1`}></span>
                    <span className="text-sm">{task.priority.text}</span>
                  </div>
                </div>
                
                <div className="kanban-card-users">
                  {task.users.map((user, idx) => (
                    <img 
                      key={idx} 
                      src={user} 
                      alt="User" 
                      className="kanban-card-user" 
                    />
                  ))}
                  <button className="kanban-card-user flex items-center justify-center bg-gray-100 text-gray-400 ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            
            <button className="add-task-btn mt-4">
              + Add task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanView;
