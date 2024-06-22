import { createContext, useState, useEffect, useContext } from "react";
import { useNavigation } from "./NavigationContext";

const AuthContext = createContext();

const fetchToken = () => {
  const getToken = localStorage.getItem("access_token");
  if (getToken?.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const navigate = useNavigation(); // Use the custom navigation hook

  useEffect(() => {
    const getToken = fetchToken();
    if (getToken) {
      navigate("/");
      setAuthentication(true);
    } else {
      navigate("/login");
      setAuthentication(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("access_token", token);
    setAuthentication(true);
    navigate("/"); // Redirect to the home page after login
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setAuthentication(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authentication, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
