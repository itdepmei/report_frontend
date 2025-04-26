import React from "react";
import Report from "./components/Report";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllReportPage from "./Pages/AllReportPage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/report" element={<AllReportPage />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
