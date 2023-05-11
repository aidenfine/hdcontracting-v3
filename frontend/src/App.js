import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "scenes/dashboard";
import Layout from "scenes/layout";
import theme from '../../frontend/src/theme'
import Login from './auth/login'

function App() {
  return (
    <div className="app">
     <BrowserRouter>
      <ThemeProvider theme={theme} >
        <Routes>
        <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
