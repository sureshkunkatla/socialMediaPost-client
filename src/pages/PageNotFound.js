import React from "react";
import { useNavigation } from "../context/NavigationContext";

const PageNotFound = () => {
  const { navigate } = useNavigation();
  return (
    <div>
      <h1>Page Not Found</h1>
      <h3 onClick={() => navigate("/")}>Home</h3>
    </div>
  );
};

export default PageNotFound;
