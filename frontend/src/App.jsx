import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TaskBoard from "./pages/TaskBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import { motion } from "framer-motion";


function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<LoginPage />} />

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/projects/:projectId"
    element={
      <ProtectedRoute>
        <TaskBoard />
      </ProtectedRoute>
    }
  />
</Routes>

    </BrowserRouter>
  );
}

export default App;
