import React, { createContext, useContext, useState, useEffect } from 'react';
import { userApi } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      userApi.getProfile()
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await userApi.login({ email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setUser(user);
  };

  const register = async (userData: any) => {
    try {
      const response = await userApi.register(userData);
      if (response.data) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        setUser(user);
      } else {
        throw new Error('Registration failed: No data received');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw new Error(error.response?.data || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 