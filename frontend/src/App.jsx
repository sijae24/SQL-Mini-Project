import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import Events from "./pages/Events";
import Volunteer from "./pages/Volunteer";
import Donate from "./pages/Donate";
import Help from "./pages/Help";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <div>
        <Navbar user={user} setUser={setUser} />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
            />
            <Route
              path="/browse"
              element={user ? <Browse user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/events"
              element={user ? <Events user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/volunteer"
              element={user ? <Volunteer user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/donate"
              element={user ? <Donate user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/help"
              element={user ? <Help user={user} /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;