import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
// import LoginPage from './pages/Login';
// import SignupPage from './pages/signUpPage';
import ProfilePage from './pages/Profile';
import DashboardPage from './pages/Dashboard';
import ChatPage from './pages/chatPage';
import Navbar from './components/Navbar';

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/profile" /> : <LoginPage />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/login" /> : <SignupPage />} />
        <Route path="/profile" element={currentUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={currentUser ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/chat/:roomId" element={currentUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={currentUser ? "/dashboard" : "/login"} />} />
        
  {/* <Route path="/profile" element={<ProfilePage />} />
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/chat/:roomId" element={<ChatPage />} />
  <Route path="/" element={<Navigate to="/dashboard" />} />
  <Route path="*" element={<Navigate to="/dashboard" />} />  */}


      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;