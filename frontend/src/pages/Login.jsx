import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { XCircleIcon } from "@heroicons/react/24/outline";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Function to show a notification
  const showNotification = (message, type = "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Function to handle login by sending a POST request
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        name,
      });

      // If login is successful, update the user state then navigate to the home page
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        console.log("Login successful");
      } else {
        showNotification("Login failed. Please try again. Use valid email and name (case sensitive).", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showNotification("Login failed. Please try again. Use valid email and name (case sensitive).", "error");
    }
  };

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        userName: registerData.name,
        email: registerData.email,
        phoneNumber: registerData.phone,
      });

      if (response.data.success) {
        // Registration successful
        setIsRegistering(false);
        setEmail(registerData.email);
        setName(registerData.name);
      } else {
        showNotification("Registration failed. Please try again.", "error");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message;

        if (errorMessage.includes("Email already exists")) {
          showNotification("Email already exists. Please use a different email.", "error");
        } else if (errorMessage.includes("Phone number already exists")) {
          showNotification("Phone number already exists. Please use a different phone number.", "error");
        } else if (errorMessage.includes("Phone number must be")) {
          showNotification("Phone number must be 10 digits", "error");
        } else if (errorMessage.includes("Invalid email format")) {
          showNotification("Invalid email format", "error");
        } else {
          showNotification("Registration failed. Please try again.", "error");
        }
      } else {
        showNotification("Registration failed. Please try again.", "error");
      }
    }
  };

  // Function to handle form submission if registering or logging in
  const handleSubmit = (e) => {
    if (isRegistering) {
      handleRegister(e);
    } else {
      handleLogin(e);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          {!isRegistering ? (
            <>
              <h1 className="text-3xl font-bold mb-6">Login</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary hover:bg-secondary w-full">
                  Login
                </button>
                <button type="button" className="btn btn-ghost hover:bg-base-100 w-full" onClick={() => setIsRegistering(true)}>
                  Need an account? Register
                </button>
                {notification && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="flex items-center p-4 rounded-lg shadow-lg animate-fade-in pointer-events-auto bg-red-100 border border-red-400 text-red-700">
                      <XCircleIcon className="h-6 w-6 mr-2" />
                      <div>
                        <label>{notification.message}</label>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6">Register</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered w-full"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="input input-bordered w-full"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary hover:bg-secondary w-full">
                  Register
                </button>
                <button type="button" className="btn btn-ghost hover:bg-base-100 w-full" onClick={() => setIsRegistering(false)}>
                  Already have an account? Login
                </button>

                {notification && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                    <div className="flex items-center p-4 rounded-lg shadow-lg animate-fade-in pointer-events-auto bg-red-100 border border-red-400 text-red-700">
                      <XCircleIcon className="h-6 w-6 mr-2" />
                      <div>
                        <label>{notification.message}</label>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
