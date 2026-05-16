import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


import PrivateRoute from "./routes/PrivateRoute";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import Register from "./component/Register";
import Leaderboard from "./component/Leaderboard.jsx";
import History from "./component/History.jsx";

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<PrivateRoute> <History /> </PrivateRoute>}/>

      <Route path="/leaderboard" element={<PrivateRoute><Leaderboard /></PrivateRoute>}/>
    {/* Protected Route */}
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
