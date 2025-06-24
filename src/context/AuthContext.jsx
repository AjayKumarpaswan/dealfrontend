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
    try {
      const res = await API.post('/auth/login', form);
      const token = res.data.token;

      // Decode token payload
      const payload = JSON.parse(atob(token.split('.')[1]));

      const currentUser = {
        _id: payload.id,
        role: payload.role,
        token: token // 👈 ADD TOKEN TO CONTEXT USER
      };

      localStorage.setItem('user', JSON.stringify(currentUser));
      localStorage.setItem('token', token);
      setUser(currentUser);

      alert("Login successful");
      navigate('/deals');
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    alert("Logout successful");
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
