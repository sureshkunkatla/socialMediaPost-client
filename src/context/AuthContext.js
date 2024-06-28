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

const fetchUserDetails = () => {
  const getUserDetails = JSON.parse(localStorage.getItem("user_details"));
  if (getUserDetails && Object.keys(getUserDetails).length > 0) {
    return getUserDetails;
  } else {
    return {};
  }
};

export const AuthProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState(false);
  const [userDetails, setUserDetails] = useState({});
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

  useEffect(() => {
    const getUserDetails = fetchUserDetails();
    setUserDetails(getUserDetails);
  }, []);

  const login = (userDetails) => {
    const userData = {
      username: userDetails?.username,
      userId: userDetails.userId,
    };
    localStorage.setItem("access_token", userDetails?.token);
    localStorage.setItem("user_details", JSON.stringify(userData));
    setAuthentication(true);
    setUserDetails(userData);
    navigate("/"); // Redirect to the home page after login
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_details");
    setAuthentication(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authentication, login, logout, userDetails }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
