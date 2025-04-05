import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Plus, FileText, BarChart2, Settings, Menu, PlusSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: FileText },
    { name: 'Create Team', href: '/create-team', icon: Plus },
    { name: 'Assign Project', href: '/assign-project', icon: PlusSquare },
    { name: 'Employee List', href: '/employee-list', icon: Users },
    { name: 'Team Performance', href: '/team-performance', icon: BarChart2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={cn("flex flex-col bg-sidebar text-sidebar-foreground border-r border-gray-200 transition-all duration-300", 
      isCollapsed ? "w-16" : "w-64")}>
      <div className="flex items-center h-16 px-4 border-b border-gray-200 bg-sidebar">
        <Link to="/" className="flex items-center space-x-2">
          {!isCollapsed && <span className="text-blue-500 text-2xl font-bold">Floww</span>}
        </Link>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto p-1 rounded-md hover:bg-sidebar-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center py-2 text-sm font-bold rounded-md transition-all duration-200",
                  isCollapsed ? "px-2 justify-center" : "px-3",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isCollapsed ? "" : "mr-3",
                    isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground"
                  )}
                />
                {!isCollapsed && item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}