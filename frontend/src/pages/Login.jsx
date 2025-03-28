import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';




const Login = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    phone: "",
    isVolunteer: false,
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        name: name,
        email: email,
      });
      console.log("Login successful:", response.data);
      alert("Welcome back!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid login. Please check your name and email.");
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      try {
        const response = await axios.post("http://localhost:5000/api/signup", registerData);
        alert("Thank you for registering!");
        console.log("Registered:", response.data);
        setIsRegistering(false);
      } catch (error) {
        console.error("Registration failed:", error);
        alert("Registration failed");
      }
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
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Register as Volunteer</span>
                    <input
                      type="checkbox"
                      name="isVolunteer"
                      className="toggle toggle-primary"
                      checked={registerData.isVolunteer}
                      onChange={(e) => setRegisterData({ ...registerData, isVolunteer: e.target.checked })}
                    />
                  </label>
                </div>
                <button type="submit" className="btn btn-primary hover:bg-secondary w-full">
                  Register
                </button>
                <button type="button" className="btn btn-ghost hover:bg-base-100 w-full" onClick={() => setIsRegistering(false)}>
                  Already have an account? Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export default Login;





