import { useState, useEffect } from "react";
import axios from "axios";
import { UsersIcon } from "@heroicons/react/24/outline";

const Volunteer = ({ user }) => {
  const [personnelStatus, setPersonnelStatus] = useState({
    isPersonnel: false,
    position: null
  });

  // To check the personnel status
  useEffect(() => {
    const checkPersonnelStatus = async () => {
      try {
        const response = await axios.post("http://localhost:5000/check-personnel", {
          userID: user.userID,
        });

        // Update personnel status
        setPersonnelStatus({
          isPersonnel: response.data.isPersonnel,
          position: response.data.position
        });

        // Update user object in local storage
        const updatedUser = { 
          ...user, 
          isPersonnel: response.data.isPersonnel,
          position: response.data.position
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Error checking personnel status:", error);
      } finally {
      }
    };

    checkPersonnelStatus();
  }, [user]);

  // Function to handle volunteer registration
  const handleVolunteer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/volunteer", {
        userID: user.userID,
      });
  
      if (response.data.success) {
        setPersonnelStatus({
          isPersonnel: true,
          position: "Volunteer"
        });
        const updatedUser = { 
          ...user, 
          isPersonnel: true,
          position: "Volunteer"
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Successfully registered as volunteer!");
      }
    } catch (error) {
      if (error.response?.data?.isPersonnel) {
        setPersonnelStatus({
          isPersonnel: true,
          position: error.response.data.position
        });
      }
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-300 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <UsersIcon className="h-8 w-8 mr-2" /> Volunteer Registration
          </h1>
          
          {/* Display registration status */}
          {personnelStatus.isPersonnel ? (
            <div role="alert" className={`alert ${
              personnelStatus.position === "Volunteer" ? "alert-success" : "alert-info"
            }`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex items-center">
                <span className="ml-2 font-bold">
                  {personnelStatus.position === "Volunteer" 
                    ? "You are already a volunteer!" 
                    : `You are registered as ${personnelStatus.position}`}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-6">You're currently registered as a regular user.</p>
              <button 
                onClick={handleVolunteer}
                className="btn btn-primary hover:bg-secondary w-full"
              >
              Register as Volunteer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Volunteer;