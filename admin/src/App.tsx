import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ownyth/login" element={<LoginPage />} />
        <Route path="/ownyth/dashboard" element={<DashboardPage />} />
        <Route path="ownyth/*" element={<Navigate to="/ownyth/login" />} /> {/* Redirect to login by default */}
      </Routes>
    </Router>
  );
}

export default App;