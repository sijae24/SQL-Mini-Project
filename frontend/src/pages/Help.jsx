import { useState, useEffect } from "react";
import { QuestionMarkCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Help = ({ user }) => {
  const [newRequest, setNewRequest] = useState("");
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [previousRequests, setPreviousRequests] = useState([]);

  // Fetch previous requests
  useEffect(() => {
    if (user?.userID) {
      axios
        .get(`http://localhost:5000/previous-requests/${user.userID}`)
        .then((response) => setPreviousRequests(response.data))
        .catch((error) => console.error("Error fetching requests:", error));
    }
  }, [user?.userID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/help", {
        userID: user.userID,
        request: newRequest,
        status: "Open",
      });

      const response = await axios.get(`http://localhost:5000/previous-requests/${user.userID}`);
      setPreviousRequests(response.data);
      setNewRequest("");
      setRequestSubmitted(true);
      setTimeout(() => setRequestSubmitted(false), 3000);
    } catch (error) {
      console.error("Error submitting help request:", error);
      
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <QuestionMarkCircleIcon className="h-8 w-8 mr-2" /> Help Center
      </h1>

      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Submit a Help Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Request: </span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Describe your question or issue..."
                    value={newRequest}
                    onChange={(e) => setNewRequest(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary hover:btn-secondary">Submit Request</button>
              </div>
            </form>
            {requestSubmitted && (
              <p className="alert alert-success mt-4">
                <CheckCircleIcon className="h-5 w-5 mr-2" /> Help request submitted successfully!
              </p>
            )}
          </div>
        </div>

        {/* Previous Requests */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Your Previous Help Requests</h2>
            <div className="flex justify-center py-8">
              {previousRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No previous requests found</p>
              ) : (
                <div className="space-y-4 w-full">
                  {previousRequests.map((request, index) => (
                    <div key={index} className="rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <span
                          className={`badge ${
                            request.status === "Resolved" ? "badge-success" : request.status === "Pending" ? "badge-info" : "badge-warning"
                          }`}
                        >
                          {request.status}
                        </span>
                      </div>
                      <p>{request.request}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
