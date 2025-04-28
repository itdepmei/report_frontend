import React from "react";
import Report from "./components/Report";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllReportPage from "./Pages/AllReportPage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import HomePage from "./Pages/HomePage";
import SendReportPage from "./Pages/SendReportPage";
import Profile from "./components/Profile";

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<AllReportPage />} />
          <Route path="/sendReport" element={<SendReportPage />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
