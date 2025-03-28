import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookOpenIcon, CalendarIcon, GiftIcon, QuestionMarkCircleIcon, SunIcon, MoonIcon, UsersIcon } from "@heroicons/react/24/outline";

const Navbar = ({ user, setUser }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "autumn");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  const toggleTheme = () => {
    if (theme === "autumn") {
      setTheme("night");
    } else {
      setTheme("autumn");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-base-200 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="btn btn-ghost normal-case text-xl" onClick={() => setSidebarOpen(false)}>
              Library
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="menu flex-1 space-y-2">
            <li>
              <Link to="/browse" className="flex items-center" onClick={() => setSidebarOpen(false)}>
                <BookOpenIcon className="h-5 w-5 mr-1" /> Browse
              </Link>
            </li>
            <li>
              <Link to="/events" className="flex items-center" onClick={() => setSidebarOpen(false)}>
                <CalendarIcon className="h-5 w-5 mr-1" /> Events
              </Link>
            </li>
            <li>
              <Link to="/volunteer" className="flex items-center" onClick={() => setSidebarOpen(false)}>
                <UsersIcon className="h-5 w-5 mr-1" /> Volunteer
              </Link>
            </li>
            <li>
              <Link to="/donate" className="flex items-center" onClick={() => setSidebarOpen(false)}>
                <GiftIcon className="h-5 w-5 mr-1" /> Donate
              </Link>
            </li>
            <li>
              <Link to="/help" className="flex items-center" onClick={() => setSidebarOpen(false)}>
                <QuestionMarkCircleIcon className="h-5 w-5 mr-1" /> Help
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-none">
          <div className="dropdown">
            <button className="btn btn-ghost btn-circle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Library
          </Link>
        </div>
        <div className="flex-none">
          <div className="flex items-center space-x-4">
          {user ? (
            <button onClick={handleLogout} className="btn btn-primary hover:bg-secondary">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary hover:bg-secondary">
              Login
            </Link>
          )}
            <label className="swap swap-rotate">
              <input type="checkbox" onChange={toggleTheme} />
              <SunIcon className="swap-on h-8 w-8 fill-current" />
              <MoonIcon className="swap-off h-8 w-8 fill-current" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
