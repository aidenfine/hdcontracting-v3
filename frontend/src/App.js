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

function App() {
  return (
    <div className="app">
     <BrowserRouter>
      <ThemeProvider theme={theme} >
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/request-access" element={<RequestAccess />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Routes>
        </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
