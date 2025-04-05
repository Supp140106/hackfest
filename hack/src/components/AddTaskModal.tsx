
import { useState } from "react";

interface AddTaskModalProps {
  onClose: () => void;
}

const AddTaskModal = ({ onClose }: AddTaskModalProps) => {
  const [taskTitle, setTaskTitle] = useState("New task #1");
  const [status, setStatus] = useState("Not started");
  const [priority, setPriority] = useState("Low priority");

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="flex items-center gap-4">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
            <h2 className="text-xl font-semibold">{taskTitle}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Assignee</label>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mr-2">
                -
              </div>
              <span>-</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="status-badge status-not-started">
              {status}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Project</label>
            <div className="flex items-center">
              <span>Choose project</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Due date</label>
            <div className="flex items-center">
              <span>Select date</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Priority</label>
            <div className="priority-badge priority-low-badge">
              {priority}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control h-32"></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Subtasks</label>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Add a subtask</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Comments</label>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-500">No comments yet.</p>
              <div className="flex justify-end mt-4">
                <button className="bg-blue-500 text-white p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
