import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";

const SidebarLayout = () => {
  const baseClass =
    "flex items-center px-4 py-2 rounded-xl transition-all duration-300 font-medium";

  const activeClass = "bg-ruby-red-50 text-ruby-red-600 shadow-sm";

  const inactiveClass =
    "text-gray-700 hover:bg-ruby-red-50 hover:text-ruby-red-600";

  return (
    <section className="flex bg-white min-h-screen font-sans">
      <aside className="w-64 pt-8 pb-8 px-6 h-screen sticky top-0 flex flex-col bg-white shadow-lg z-50 overflow-y-auto">
        <div className="flex gap-4 items-center justify-center flex-row mb-10 shrink-0">
          <img src={logo} alt="logo" className="w-10 h-auto" />
          <h1 className="text-4xl font-serif font-bold text-ruby-red-600">
            SRR
          </h1>
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Main
            </h3>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Calendar
            </NavLink>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Reservations
            </h3>
            <NavLink
              to="/reservations/requests"
              className={({ isActive }) =>
                `justify-between ${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              <span>Requests</span>
              <span className="bg-ruby-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                3
              </span>
            </NavLink>
            <NavLink
              to="/reservations/history"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Booking History
            </NavLink>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Management
            </h3>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Rooms
            </NavLink>
            <NavLink
              to="/facilities"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Facilities
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Users
            </NavLink>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Analytics
            </h3>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Reports
            </NavLink>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col gap-2">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-xl transition-colors duration-300 text-sm ${isActive ? "text-ruby-red-600 font-bold bg-ruby-red-50" : "text-gray-600 hover:text-gray-900"}`
            }
          >
            Settings
          </NavLink>
          <button className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-300 text-sm text-left w-full">
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen p-8 bg-gray-50">
        <Outlet />
      </main>
    </section>
  );
};

export default SidebarLayout;
