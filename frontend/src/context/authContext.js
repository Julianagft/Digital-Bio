"use client"
import { createContext, useContext, useEffect, useState } from 'react'
import API from '@/service/api';
import { jwtDecode } from 'jwt-decode';

 
const AuthContext  = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          API.defaults.headers.common['token'] = token;
          const decodedToken = jwtDecode(token);

          setUser(decodedToken); 
        }
      }, []);
  
    const login = (userData) => {
      setUser(userData);
      localStorage.setItem('token', userData.token);
      API.defaults.headers.common['token'] = userData.token;
    };
  
    const logout = () => {
      setUser(null);
      localStorage.removeItem('token');
      API.defaults.headers.common['token'] = '';
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export function useAuth() {
    return useContext(AuthContext);
  }