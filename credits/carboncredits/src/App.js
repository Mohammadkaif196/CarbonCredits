import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import RegulatoryAuthorityDash from "./components/dashboards/regulatory/regulatory";
import Boxes from "./components/splash/splashboxes"; // Splash screen component
import { Header } from "./utils/Header";
import Homepage from "./pages/Homepage";
import Supplierdash from "./components/dashboards/supplierdash";
import { LoginContextProvider, LoginContext } from "./utils/logincontext";
import Auditordash from "./components/dashboards/auditordash/auditordash";
import Marketplace from "./components/marketplace/Marketplace";
import Guidelines from "./components/GuideLines/Guidelines";
import Buyer from "./components/dashboards/Buyer";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LoginContextProvider>
      <Router>
        <div className="App w-[100vw] min-h-screen flex flex-col justify-center items-center">
          {showSplash ? <Boxes /> : <MainRoutes />}
        </div>
      </Router>
    </LoginContextProvider>
  );
}

function MainRoutes() {
  const { isLoggedIn, userDetails } = useContext(LoginContext);

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Homepage /> : <Navigate to="/login" />}
      />
      <Route
        path="/signup"
        element={!isLoggedIn ? <Signup /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/supplier-dashboard/:nfthash"
        element={
          isLoggedIn && userDetails?.role === 1 && userDetails?.nfthash ? (
            <Supplierdash />
          ) : (
            <div>Access Denied for other than supplier dashboard</div>
          )
        }
      />
      <Route
        path="/auditor-dashboard/:nfthash"
        element={
          isLoggedIn && userDetails?.role === 2 && userDetails?.nfthash ? (
            <Auditordash />
          ) : (
            <div>Access Denied for other than auditor dashboard </div>
          )
        }
      />
      <Route
        path="/regulator-dashboard/:nfthash"
        element={
          isLoggedIn && userDetails?.role === 3 && userDetails?.nfthash ? (
            <RegulatoryAuthorityDash />
          ) : (
            <div>Access Denied other than regulator dash boards</div>
          )
        }
      />
      <Route
        path="/buyer-dashboard/:nfthash"
        element={
          isLoggedIn && userDetails?.role === 4 && userDetails?.nfthash ? (
            <Buyer />
          ) : (
            <div>Access Denied other than buyerdashboard</div>
          )
        }
      />
       <Route path="/marketplace" element={<Marketplace />} />
       <Route path="/Guidelines" element={<Guidelines />} />
    </Routes>
  );
}

export default App;
