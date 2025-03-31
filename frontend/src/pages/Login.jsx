import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

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
      } else {
        setError(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again. Use valid credentials. Username and email are case sensitive.");
      setTimeout(() => setError(null), 5000);
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

      // If registration is successful, show a success message
      if (response.data.message === "User added successfully") {
        setError(null);
        // alert("Registration successful! Please login.");
        setIsRegistering(false);
        setEmail(registerData.email);
        setName(registerData.name);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again. Username and email are case sensitive. Phone number must be at least 10 digits.");
      setTimeout(() => setError(null), 5000);
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

                {/* Error message */}
                {error && (
                  <div className="alert alert-error shadow-lg mt-4">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{error}</span>
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
                {error && (
                  <div className="alert alert-error shadow-lg mt-4">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{error}</span>
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

