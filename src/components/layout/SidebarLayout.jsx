import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";

const SidebarLayout = () => {
  const baseClass =
    "flex items-center justify-between px-8 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-500 border-l-2 group";

  const activeClass =
    "border-ruby-red-600 text-ruby-red-800 bg-gray-50 font-semibold";

  const inactiveClass =
    "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-200 hover:bg-gray-50/50";

  const sectionHeaderClass =
    "px-8 mt-6 mb-2 text-sm font-serif italic text-gray-400";

  return (
    <section className="flex bg-[#FDFDFD] min-h-screen font-sans">
      <aside className="w-72 h-screen sticky top-0 flex flex-col bg-white border-r border-gray-200 z-50">
        <div className="flex flex-col items-center justify-center pt-10 pb-8 shrink-0 border-b border-gray-100 mx-6">
          <img src={logo} alt="logo" className="w-12 h-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-widest">
            SRR
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1">
            Residence
          </p>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto py-6 custom-scrollbar">
          <div>
            <h3 className={sectionHeaderClass}>Overview</h3>
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

          <div>
            <h3 className={sectionHeaderClass}>Concierge</h3>
            <NavLink
              to="/reservations/requests"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Requests</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-sm transition-colors ${
                      isActive
                        ? "bg-ruby-red-600 text-white"
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                    }`}
                  >
                    3
                  </span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/reservations/history"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              History
            </NavLink>
          </div>

          <div>
            <h3 className={sectionHeaderClass}>Collection</h3>
            <NavLink
              to="/rooms"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              The Rooms
            </NavLink>
            <NavLink
              to="/facilities"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Amenities
            </NavLink>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Guests
            </NavLink>
          </div>

          <div>
            <h3 className={sectionHeaderClass}>Insights</h3>
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

        <div className="p-6 border-t border-gray-100 bg-white">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center justify-center px-4 py-3 mb-2 text-xs uppercase tracking-[0.2em] transition-colors duration-300 border border-transparent ${
                isActive
                  ? "text-ruby-red-800 font-bold bg-gray-50"
                  : "text-gray-500 hover:text-gray-900 hover:border-gray-200"
              }`
            }
          >
            Settings
          </NavLink>
          <button className="w-full text-center px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-400 hover:text-red-700 hover:bg-red-50 transition-all duration-500">
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen p-10 bg-[#FCFCFC]">
        <Outlet />
      </main>
    </section>
  );
};

export default SidebarLayout;
