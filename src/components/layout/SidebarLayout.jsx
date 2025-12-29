import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, AlertTriangle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/logo.png";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:5000/api/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json();

        if (json.success) {
          const count = json.data.filter((r) => r.status === "pending").length;
          setPendingCount(count);
        }
      } catch (error) {
        console.error("Failed to fetch pending count", error);
      }
    };

    fetchPendingCount();
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsMobileOpen(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    setShowLogoutModal(false);
    toast.success("Signed out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const baseClass =
    "flex items-center justify-between px-8 py-3 text-xs uppercase tracking-[0.15em] transition-all duration-500 border-l-4 group font-medium";

  const activeClass = "border-gray-900 text-gray-900 bg-gray-50 font-bold";

  const inactiveClass =
    "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50/50";

  const sectionHeaderClass =
    "px-8 mt-8 mb-3 text-sm font-serif italic text-gray-400";

  return (
    <section className="flex bg-[#FDFDFD] min-h-screen font-sans relative">
      <Toaster position="top-center" />

      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutModal(false)}
          />

          <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-sm overflow-hidden border border-gray-100 transform transition-all scale-100">
            <div className="p-8 text-center">
              <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-5 text-red-500">
                <LogOut size={24} strokeWidth={2} />
              </div>

              <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 tracking-wide">
                Sign Out?
              </h3>
              <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to end your session? You will need to sign
                in again to access the dashboard.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={confirmLogout}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-lg shadow-red-200"
                >
                  Yes, Sign Out
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="w-full py-3 bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 flex flex-col bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-10 pb-8 shrink-0 border-b border-gray-100 mx-6 relative">
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-0 right-0 lg:hidden text-gray-400 hover:text-red-500"
          >
            <X size={24} />
          </button>

          <img src={logo} alt="logo" className="w-12 h-auto mb-3 opacity-90" />
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-widest">
            SRR
          </h1>
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] mt-1">
            Admin Portal
          </p>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto py-4 custom-scrollbar">
          <div>
            <h3 className={sectionHeaderClass}>Overview</h3>
            <NavLink
              to="/dashboard"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/calendar"
              onClick={() => setIsMobileOpen(false)}
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
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              {({ isActive }) => (
                <>
                  <span>Requests</span>
                  {pendingCount > 0 && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "bg-red-50 text-red-600 group-hover:bg-red-100"
                      }`}
                    >
                      {pendingCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
            <NavLink
              to="/reservations/history"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              History Log
            </NavLink>
          </div>

          <div>
            <h3 className={sectionHeaderClass}>Collection</h3>
            <NavLink
              to="/rooms"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              The Rooms
            </NavLink>
            <NavLink
              to="/facilities"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Amenities
            </NavLink>
            <NavLink
              to="/users"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : inactiveClass}`
              }
            >
              Guests / Users
            </NavLink>
          </div>

          <div>
            <h3 className={sectionHeaderClass}>Insights</h3>
            <NavLink
              to="/reports"
              onClick={() => setIsMobileOpen(false)}
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
            onClick={() => setIsMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-center px-4 py-3 mb-2 text-xs uppercase tracking-[0.2em] transition-colors duration-300 border border-transparent ${
                isActive
                  ? "text-gray-900 font-bold bg-gray-50"
                  : "text-gray-400 hover:text-gray-900 hover:border-gray-200"
              }`
            }
          >
            Settings
          </NavLink>

          <button
            onClick={handleLogoutClick}
            className="w-full text-center px-4 py-3 text-xs uppercase tracking-[0.2em] text-red-400 hover:text-red-600 hover:bg-red-50 transition-all duration-500 rounded-sm group flex items-center justify-center gap-2"
          >
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen relative bg-[#FCFCFC]">
        <div className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SRR" className="w-8 h-auto opacity-80" />
            <span className="font-serif font-bold text-gray-900">
              SRR Admin
            </span>
          </div>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-gray-600"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="p-6 lg:p-10">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default SidebarLayout;
