import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const Help = () => {
  const [newRequest, setNewRequest] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <QuestionMarkCircleIcon className="h-8 w-8 mr-2" /> Help Center
      </h1>

      <div className="space-y-6">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Submit a Help Request</h2>
            <form>
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
                <button className="btn btn-primary hover:btn-secondary">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;

