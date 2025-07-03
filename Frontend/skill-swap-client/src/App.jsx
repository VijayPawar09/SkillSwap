import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from './pages/Home'

export default function App() {
  return (
    <div>
      <Home />
    </div>
    
      // <Routes>
      //   <Route path="/" element={<Navigate to="/login" replace />} />
      //   <Route path="/login" element={<Login />} />
      //   <Route path="/signup" element={<SignUp />} />
      // </Routes>
    
  );
}
