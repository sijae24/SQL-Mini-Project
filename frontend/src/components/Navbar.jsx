import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookOpenIcon, CalendarIcon, GiftIcon, QuestionMarkCircleIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "autumn");

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
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Library
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link to="/browse" className="flex items-center">
              <BookOpenIcon className="h-5 w-5 mr-1" /> Browse
            </Link>
          </li>
          <li>
            <Link to="/events" className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-1" /> Events
            </Link>
          </li>
          <li>
            <Link to="/donate" className="flex items-center">
              <GiftIcon className="h-5 w-5 mr-1" /> Donate
            </Link>
          </li>
          <li>
            <Link to="/help" className="flex items-center">
              <QuestionMarkCircleIcon className="h-5 w-5 mr-1" /> Help
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center space-x-4">
        <Link to="/login" className="btn btn-primary hover:bg-secondary">
          Login
        </Link>
        <div className="flex items-center">
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={toggleTheme} />
            <MoonIcon className="swap-on h-8 w-8 fill-current" />
            <SunIcon className="swap-off h-8 w-8 fill-current" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
