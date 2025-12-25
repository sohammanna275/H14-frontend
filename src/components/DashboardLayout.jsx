import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false); // hidden by default

  const closeSidebar = () => setOpen(false);
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      {/* Toggle Button (Always Visible) */}
      <button
        className={`sidebar-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen(true)}
        >
        ☰
        </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="logo" onClick={() => navigate('/dashboard')}>🏨 Hostel 14</button>
          <button className="collapse-btn" onClick={closeSidebar}>
            ✖
          </button>
        </div>

        <nav className="menu">
          <NavLink
            to="/dashboard/students"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            👨‍🎓 Students
          </NavLink>

          <NavLink
            to="/dashboard/rooms"
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            🛏 Room <br></br>
            Allocation
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-content bg-particles">
        
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
