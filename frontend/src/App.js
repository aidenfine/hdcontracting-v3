import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "scenes/dashboard";
import Layout from "scenes/layout";
import theme from '../../frontend/src/theme'

function App() {
  return (
    <div className="app">
     <BrowserRouter>
      <ThemeProvider theme={theme} >
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        </ThemeProvider>
     </BrowserRouter>
    </div>
  );
}

export default App;
