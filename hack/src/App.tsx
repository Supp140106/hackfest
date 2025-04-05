import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import HRDashboard from "./pages/HRDashboard";
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import ProjectOverview from "./pages/ProjectOverview";
import Report from "./pages/Report";
import KanbanView from "./pages/KanbanView";
import Sidebar from "./components/Sidebar";
import AddTaskModal from "./components/AddTaskModal";

import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";

const App = () => {
  const [showAddTaskModal, setShowAddTaskModal] = React.useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const userPosition = user ? user.position : null;

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/signup" element={<Signup />} />

            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <>
                    <Sidebar handleOpenAddTaskModal={() => setShowAddTaskModal(true)} />
                    <main className="main-content">
                      <Routes>
                        {userPosition === 'HR' && (
                          <>
                            <Route path="/" element={<HRDashboard />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/project-overview" element={<ProjectOverview />} />
                            <Route path="/kanban" element={<KanbanView />} />
                            <Route path="/report" element={<Report />} />
                          </>
                        )}
                        {userPosition === 'manager' && (
                          <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/project-overview" element={<ProjectOverview />} />
                            <Route path="/report" element={<Report />} />
                          </>
                        )}
                        {userPosition === 'teamlead' && (
                          <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/tasks" element={<Tasks />} />
                            <Route path="/kanban" element={<KanbanView />} />
                          </>
                        )}
                        {userPosition === 'employee' && (
                          <>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/calendar" element={<Calendar />} />
                            <Route path="/tasks" element={<Tasks />} />
                          </>
                        )}
                        {!userPosition && (
                          <Route path="*" element={<Navigate to="/signup" replace />} />
                        )}
                    </Routes>
                    </main>
                    {showAddTaskModal && <AddTaskModal onClose={() => setShowAddTaskModal(false)} />}
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;