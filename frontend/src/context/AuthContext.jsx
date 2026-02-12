import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth safely from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser && storedUser !== "undefined") {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Invalid stored user data");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token);
    setUser(data.user);

    return data.user;
  };

  // 🔥 IMPORTANT: REGISTER DOES NOT AUTO LOGIN ANYMORE
  const register = async (formData) => {
    const data = await registerUser(formData);
    return data; // just return message
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAdmin: user?.role === "admin",
        isAuthenticated: !!token,
        loading
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
