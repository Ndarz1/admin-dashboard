import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import SidebarLayout from "./components/layout/SidebarLayout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<SidebarLayout />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
