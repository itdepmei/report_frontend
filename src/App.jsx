import React from "react";
import ReportGenerator from "./components/RportWord";
import Report from "./components/Report";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllReportPage from "./Pages/AllReportPage";

const App = () => {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/report" element={<AllReportPage />} />
          <Route path="/report/:id" element={<Report />} />
          <Route path="/download" element={<ReportGenerator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
