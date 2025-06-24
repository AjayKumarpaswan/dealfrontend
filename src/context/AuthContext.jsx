import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (form) => {
    const res = await API.post('/auth/login', form);
    localStorage.setItem('token', res.data.token);
    const payload = JSON.parse(atob(res.data.token.split('.')[1]));
    const currentUser = { id: payload.id, role: payload.role };
    localStorage.setItem('user', JSON.stringify(currentUser));
    setUser(currentUser);
    alert("login successfully")
    navigate('/deals');
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
