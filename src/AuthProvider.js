// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [url, setUrl] = useState('https://super-polo-shirt-tick.cyclic.app');// useState('http://localhost:3333');//

  const login = () => {
    window.open(`${url}/auth/google`, "_self")
  };

  const logout = async () => {
    setIsAuthenticated(false);
    axios.get(`${url}/auth/logout`, {
            withCredentials: true
        }).then((res) => {
            if (res.data === "done") {
               // window.location.href = "/"
            }
        })
  };

  

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${url}/auth/login/success`, {
          withCredentials: true,
        });
        if (response.data.message === "successfull") {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log('refresh-pajak');
        window.location.reload();
      }
    };
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
