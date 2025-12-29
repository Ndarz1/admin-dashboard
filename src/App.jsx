import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

// Pages
import LoginPage from "./pages/auth/LoginPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";

// Layout
import SidebarLayout from "./components/layout/SidebarLayout.jsx";

// Pages - Management
import RoomListPage from "./pages/management/rooms/RoomListPage.jsx";
import RoomFormPage from "./pages/management/rooms/RoomFormPage.jsx";
import FacilityPage from "./pages/management/facilities/FacilityPage.jsx";
import UserPage from "./pages/management/users/UserPage.jsx";

// Pages - Reservations & Calendar
import RequestPage from "./pages/reservations/RequestPage.jsx";
import HistoryPage from "./pages/reservations/HistoryPage.jsx";
import CalendarPage from "./pages/calendar/CalendarPage.jsx";

// Pages - Others
import ReportsPage from "./pages/analytics/ReportsPage.jsx";
import SettingsPage from "./pages/settings/SettingsPage.jsx";

// --- KOMPONEN PROTEKSI ---
// Komponen ini mengecek apakah User punya token & role admin
const ProtectedRoute = () => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");

  // Jika tidak ada token ATAU role bukan admin, tendang ke login
  if (!token || (role !== "admin" && role !== "Admin")) {
    return <Navigate to="/login" replace />;
  }

  // Jika aman, render halaman yang diminta (Outlet)
  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<LoginPage />} />

        {/* --- PROTECTED ROUTES --- */}
        {/* Semua route di dalam sini butuh Login */}
        <Route element={<ProtectedRoute />}>
          {/* Layout Sidebar membungkus halaman admin */}
          <Route element={<SidebarLayout />}>
            {/* Redirect root '/' ke dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />

            {/* Rooms Management */}
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/rooms/add" element={<RoomFormPage />} />
            <Route path="/rooms/edit/:id" element={<RoomFormPage />} />

            {/* Reservations */}
            <Route path="/reservations/requests" element={<RequestPage />} />
            <Route path="/reservations/history" element={<HistoryPage />} />

            {/* Other Management */}
            <Route path="/facilities" element={<FacilityPage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch All: Jika user akses URL aneh, kembalikan ke login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
