import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "scenes/dashboard";
import Layout from "scenes/layout";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
