import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ComplaintsPage from "./pages/ComplaintsPage";
import Admin from "./pages/Admin";
import Reporting from "./pages/Reporting";
import Evidence from "./pages/Evidence";
import Tracking from "./pages/Tracking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaint" element={<ComplaintsPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/evidence" element={<Evidence />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;