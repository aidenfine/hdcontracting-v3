import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "scenes/dashboard";
import Layout from "scenes/layout";
import theme from '../../frontend/src/theme'
import Login from './auth/login'
import RequestAccess from "auth/requestAccess";
import ForgotPassword from "auth/resetPassword";
import { Jobs } from "scenes/jobs";
import { Invoices } from "scenes/Invoices";
import { Calendar } from "scenes/Calendar";
import { Employees } from "scenes/employees";
import AddJob from "components/addNewJob/AddJob";
function App() {
  
  if (!window.localStorage.getItem("isLoggedIn")) {
    window.localStorage.setItem("isLoggedIn", "false");
  }
  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/request-access" element={<RequestAccess />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} /> {/* Wrap ProtectedRoutes */}
            <Route path="/jobs" element={<Jobs />} /> {/* Wrap ProtectedRoutes */}
            <Route path="/invoices" element={<Invoices />} /> {/* Wrap ProtectedRoutes */}
            <Route path="/calendar" element={<Calendar />} /> {/* Wrap ProtectedRoutes */}
            <Route path="/employees" element={<Employees />} /> {/* Wrap ProtectedRoutes */}
            <Route path="/jobs/newJob" element={<AddJob />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </div>
  );
}

export default App;
