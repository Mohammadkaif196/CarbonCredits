import React, { createContext, useState, useContext, useEffect } from "react";

const LoginContext = createContext();

const LoginContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const logging = async () => {
    try {
      const response = await fetch("http://localhost:4000/sessionverify", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUserDetails({
          name: data.name,
          role: data.role,
          nfthash: data.nfthash,
        });
        return true;
      }
    } catch (error) {
      console.log("Invalid token or token expired", error);
      return false;
    }
  };

  useEffect(() => {
    logging();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setUserDetails(null);
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <LoginContext.Provider value={{ isLoggedIn, userDetails, logging, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginContextProvider };
