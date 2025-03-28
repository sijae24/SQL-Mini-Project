import { useState, useEffect } from "react";
import { UsersIcon } from "@heroicons/react/24/outline";

const Volunteer = ({ user }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [volunteerData, setVolunteerData] = useState({
    name: "",
    email: "",
    phone: "",
    isVolunteer: false,
  });

  useEffect(() => {
    if (user && user.isVolunteer) {
      setIsRegistering(true);
    }
  }, [user]);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistering(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      alert("Thank you for registering as a volunteer!");
      console.log(volunteerData);
      setIsRegistering(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteerData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <UsersIcon className="h-8 w-8 mr-2" /> Volunteer Registration
          </h1>
          {isRegistering ? (
            <div role="alert" className="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex items-center">
                <span className="ml-2 font-bold">You are already a volunteer!</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteerData.name}
                  onChange={handleInputChange}
                  name="name"
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
                  value={volunteerData.email}
                  onChange={handleInputChange}
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={volunteerData.phone}
                  onChange={handleInputChange}
                  name="phone"
                  required
                />
              </div>
              <button className="btn btn-primary hover:bg-secondary w-full" type="submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
