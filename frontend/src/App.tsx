import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AddRecipe from './pages/AddRecipe';
import './App.css';
// import ViewRecipe from './pages/ViewRecipe';
// import MyRecipes from './pages/MyRecipes';
// import Favorites from './pages/Favorites';
// import Categories from './pages/Categories';
// import Assistant from './pages/Assistant';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// Auth Layout component (for login/signup pages)
const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="auth-layout">{children}</div>;
};

// Main Layout component (for authenticated pages)
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <main id="main">{children}</main>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

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
          <MainLayout>
            <Home />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout>
            <Profile />
          </MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/add-recipe" element={
        <ProtectedRoute>
          <MainLayout>
            <AddRecipe />
          </MainLayout>
        </ProtectedRoute>
      } />
      {/* <Route path="/recipe/:id" element={
        <ProtectedRoute>
          <ViewRecipe />
        </ProtectedRoute>
      } />
      <Route path="/my-recipes" element={
        <ProtectedRoute>
          <MyRecipes />
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      } />
      <Route path="/categories" element={
        <ProtectedRoute>
          <Categories />
        </ProtectedRoute>
      } />
      <Route path="/assistant" element={
        <ProtectedRoute>
          <Assistant />
        </ProtectedRoute>
      } /> */}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App; 