import { NavLink, Outlet } from "react-router-dom";
import "./StudentLayout.css";

const StudentLayout = () => {
  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <h2 className="student-title">🎓 Student Panel</h2>

        <nav className="student-menu">
          <NavLink to="/student" end className="student-link">
            🏠 Dashboard
          </NavLink>

          <NavLink to="/student/room" className="student-link">
            🛏 My Room
          </NavLink>

          <NavLink to="/student/complaints" className="student-link">
            📝 Complaints
          </NavLink>

          <NavLink to="/student/feedback" className="student-link">
            ⭐ Feedback
          </NavLink>

          <NavLink to="/student/leave" className="student-link">
            📅 Leave Application
          </NavLink>
        </nav>
      </aside>

      <main className="student-content bg-particles">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
