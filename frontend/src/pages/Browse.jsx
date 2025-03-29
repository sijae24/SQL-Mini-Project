import { useState } from "react";
import { BookOpenIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const Browse = () => {
  const [activeTab, setActiveTab] = useState("browse");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="tabs tabs-boxed mb-8">
        <button 
          className={`tab ${activeTab === "browse" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("browse")}
        >
          <BookOpenIcon className="h-5 w-5 mr-2" /> Browse
        </button>

        <button 
          className={`tab ${activeTab === "borrow" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("borrow")}
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Borrow
        </button>
        <button 
          className={`tab ${activeTab === "return" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("return")}
        >
          <ArrowUpTrayIcon className="h-5 w-5 mr-2" /> Return
        </button>
      </div>
      <div className="container mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card bg-base-100 shadow-xl transition-transform hover:transform hover:scale-105">
              <div className="card-body items-center text-center">
                <h2 className="card-title">Book Title</h2>   
                <p>Author</p>
                <p>Genre</p>
                <p>ISBN</p>
                <p>Availability</p>
              </div>
              <button className="btn btn-primary hover:btn-secondary mb-4"> Borrow </button>
              <button className="btn btn-primary hover:btn-secondary"> Borrow </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Browse;