import React from 'react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card1';
import { Button } from '@/components/ui/button1';
import { BarChart, Calendar, CheckCircle, Clock, User, Users } from 'lucide-react';
import { employees, teams, projects } from '@/lib/data';

// Create a tasks array since it's missing in data.ts
const tasks = [
  { id: '1', title: 'Review Frontend Updates', status: 'In Progress', assignee: 'Employee 1' },
  { id: '2', title: 'Complete API Integration', status: 'Completed', assignee: 'Employee 2' },
  { id: '3', title: 'Fix UI Responsiveness', status: 'Pending', assignee: 'Employee 3' },
  { id: '4', title: 'Update Documentation', status: 'In Progress', assignee: 'Employee 4' },
  { id: '5', title: 'Testing Security Features', status: 'Pending', assignee: 'Employee 5' },
];

const HRDashboard = () => {
  return (
    <Layout>
      <Header 
        title="HR Dashboard" 
        subtitle="Overview of teams, projects, and employees" 
      />
      
      <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-fadeIn">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">
              Active teams across all departments
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn delay-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently employed staff members
            </p>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn delay-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              Current projects in progress
            </p>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 animate-fadeIn delay-300">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center p-2 border rounded-lg">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.assignee}</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fadeIn delay-400">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projects.slice(0, 3).map((project, i) => (
                <div key={project.id} className="flex items-center p-2 border rounded-lg">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{project.name}</p>
                    <p className="text-xs text-muted-foreground">Due in {5 + i} days</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default HRDashboard;