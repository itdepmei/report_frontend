import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Profile from "./components/Profile";
import AllReportPage from "./Pages/AllReportPage";
import Report from "./components/Report";
import SendReportPage from "./Pages/SendReportPage";
import UserTablePage from "./Pages/Auth/UserTablePage";
import DepartmentReportPage from "./Pages/DepartmentReportPage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/report" element={<AllReportPage />} />
          <Route path="/report/:id" element={<Report />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["assistant"]} />}>
          <Route path="/sendReport" element={<SendReportPage />} />
          <Route path="/departmentReport" element={<DepartmentReportPage />} />

        </Route>

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/allUser" element={<UserTablePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
