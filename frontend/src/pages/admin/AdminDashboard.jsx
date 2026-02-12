import React from 'react';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  ClipboardList, 
  MessageSquare, 
  LogOut,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { to: "/admin", end: true, icon: <LayoutDashboard size={20} />, label: "Overview" },
    { to: "/admin/programs", icon: <BookOpen size={20} />, label: "Programs" },
    { to: "/admin/users", icon: <Users size={20} />, label: "Users" },
    { to: "/admin/enrollments", icon: <ClipboardList size={20} />, label: "Enrollments" },
    { to: "/admin/inquiries", icon: <MessageSquare size={20} />, label: "Inquiries" },
  ];

  return (
    // ADDED: pt-20 to push content down below the fixed Navbar
    <div className="min-h-screen bg-slate-50 flex font-sans pt-20">
      
      {/* --- SIDEBAR --- */}
      {/* CHANGED: top-20 ensures it starts below the Navbar */}
      <aside className="fixed left-0 top-20 bottom-0 w-64 bg-slate-900 text-white flex flex-col z-30 transition-all duration-300 shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-slate-900 shadow-lg shadow-yellow-500/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-wide">Admin Panel</h2>
            <p className="text-[10px] text-slate-400">Impact You Academy</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-yellow-500 text-slate-900 shadow-md"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-slate-900" : "text-slate-500 group-hover:text-white"}>
                    {item.icon}
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-yellow-500 font-bold border border-slate-600 text-xs">
              {user?.name?.charAt(0) || "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-white">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-xs font-bold uppercase tracking-wider"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      {/* ml-64 pushes content to the right of the sidebar */}
      <main className="flex-1 ml-64 p-8 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto">
           <Outlet />
        </div>
      </main>

    </div>
  );
};

export default AdminDashboard;