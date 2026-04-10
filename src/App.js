import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoadingPage from "./components/Pages/Loadingpage";

import Home from "./components/mainHomepages/Home";
import Footer from "./components/Pages/Footer";
import Navigation2 from "./components/Pages/Nav2";
import Loginpage from "./components/Pages/Loginpage";

import Jobhomepage from "../src/components/Homepagess/Jobseeker/Homepage";
import Ausbuild from "../src/components/Homepagess/Ausbildung/Homepage";
import Studyaboard from "../src/components/Homepagess/Studyaboard/Homepage";
import Dashboard from "./components/Pages/dashboard";
import Tools from "./components/Pages/Tools";
import DownloadPage from "./components/Pages/Downloadpg";

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  // Initial App Loader logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Shows the loading page for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  const hideLayout = ["/Login-page", "/dashboard", "/join-network", "/"].includes(location.pathname);

  // 1. If loading, return ONLY the LoadingPage
  if (isLoading) {
    return <LoadingPage />;
  }

  // 2. If finished loading, return the actual App logic
  return (
    <>
      {!hideLayout && <Navigation2 />}
      
      <div className="min-h-screen bg-slate-50 selection:bg-blue-600 selection:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Job-seeker" element={<Jobhomepage />} />
          <Route path="/aus-bildung" element={<Ausbuild />} />
          <Route path="/study-abroad" element={<Studyaboard />} />
          <Route path="/Login-page" element={<Loginpage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Tools" element={<Tools />} />
          <Route path="/Download" element={<DownloadPage />} />
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;