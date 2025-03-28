import { useState } from "react";
import { BookOpenIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";

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
    </div>
  );
};

export default Browse;
