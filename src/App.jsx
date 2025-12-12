import LoginPage from "./pages/auth/LoginPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import SidebarLayout from "./components/layout/SidebarLayout.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoomListPage from "./pages/management/rooms/RoomListPage.jsx";
import RoomFormPage from "./pages/management/rooms/RoomFormPage.jsx";
import RequestPage from "./pages/reservations/RequestPage.jsx";
import HistoryPage from "./pages/reservations/HistoryPage.jsx";
import CalendarPage from "./pages/calendar/CalendarPage.jsx";
import FacilityPage from "./pages/management/facilities/FacilityPage.jsx";
import UserPage from "./pages/management/users/UserPage.jsx";
import ReportsPage from "./pages/analytics/ReportsPage.jsx";
import SettingsPage from "./pages/settings/SettingsPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/rooms" element={<RoomListPage />} />
          <Route path="/rooms/add" element={<RoomFormPage />} />
          <Route path="/rooms/edit/:id" element={<RoomFormPage />} />
          <Route path="/reservations/requests" element={<RequestPage />} />
          <Route path="/reservations/history" element={<HistoryPage />} />
          <Route path="/facilities" element={<FacilityPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
