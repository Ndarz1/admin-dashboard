import LoginPage from "./pages/auth/LoginPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import SidebarLayout from "./components/layout/SidebarLayout.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RoomListPage from "./pages/management/rooms/RoomListPage.jsx";
import RoomFormPage from "./pages/management/rooms/RoomFormPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/rooms" element={<RoomListPage />} />
          <Route path="/rooms/add" element={<RoomFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
