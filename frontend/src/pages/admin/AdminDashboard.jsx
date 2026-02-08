import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6">
        <h2 className="text-xl font-bold text-navy mb-8">
          Admin Panel
        </h2>

        <nav className="space-y-2">
          <NavLink
            to="/admin/programs"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-semibold transition ${
                isActive
                  ? "bg-navy text-white"
                  : "text-charcoal hover:bg-navy/5"
              }`
            }
          >
            Programs
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-semibold transition ${
                isActive
                  ? "bg-navy text-white"
                  : "text-charcoal hover:bg-navy/5"
              }`
            }
          >
            Users
          </NavLink>

          <NavLink
            to="/admin/enrollments"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-semibold transition ${
                isActive
                  ? "bg-navy text-white"
                  : "text-charcoal hover:bg-navy/5"
              }`
            }
          >
            Enrollments
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
