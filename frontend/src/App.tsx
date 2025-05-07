import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import MyRecipes from './pages/MyRecipes';
import Favorites from './pages/Favorites';
import Categories from './pages/Categories';
import Assistant from './pages/Assistant';
import './App.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="auth-layout">
      {children}
    </div>
  );
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      } />
      <Route path="/signup" element={
        <AuthLayout>
          <Signup />
        </AuthLayout>
      } />

      {/* Protected Routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout>
            <Home />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <AppLayout>
            <Profile />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/recipes/add" element={
        <ProtectedRoute>
          <AppLayout>
            <AddRecipe />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/recipe/:id" element={
        <ProtectedRoute>
          <AppLayout>
            <ViewRecipe />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/my-recipes" element={
        <ProtectedRoute>
          <AppLayout>
            <MyRecipes />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute>
          <AppLayout>
            <Favorites />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/categories" element={
        <ProtectedRoute>
          <AppLayout>
            <Categories />
          </AppLayout>
        </ProtectedRoute>
      } />
      <Route path="/assistant" element={
        <ProtectedRoute>
          <AppLayout>
            <Assistant />
          </AppLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App; 