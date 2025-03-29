import { useState, useEffect } from "react";
import axios from "axios";
import {
  BookOpenIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const Browse = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [items, setItems] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [returned, setReturned] = useState([]);
  const [isBorrowing, setIsBorrowing] = useState(false);

  const userID = JSON.parse(localStorage.getItem("user"))?.userID;

  const fetchItems = () => {
    axios
      .get("http://localhost:5000/library-items")
      .then((res) => {
        const sortedItems = res.data
          .filter((item) => item.availability > 0 || item.status === "coming_soon")
          .sort((a, b) => {
            const typeOrder = { Book: 1, Magazine: 2, CD: 3, Journal: 4 };
            const typeCompare = (typeOrder[a.itemType] || 5) - (typeOrder[b.itemType] || 5);
            if (typeCompare !== 0) return typeCompare;
            return a.title.localeCompare(b.title);
          });

        setItems(sortedItems);
      })
      .catch((err) => {
        console.error("Error fetching library items:", err);
      });
  };

  const fetchBorrowed = () => {
    axios
      .get(`http://localhost:5000/borrowed-items/${userID}`)
      .then((res) => setBorrowed(res.data))
      .catch((err) => console.error("Error fetching borrowed items:", err));
  };

  const fetchReturned = () => {
    axios
      .get(`http://localhost:5000/returned-items/${userID}`)
      .then((res) => setReturned(res.data))
      .catch((err) => console.error("Error fetching returned items:", err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (activeTab === "borrow" && userID) {
      fetchBorrowed();
    } else if (activeTab === "returned" && userID) {
      fetchReturned();
    }
  }, [activeTab, userID]);

  const handleBorrow = (itemID) => {
    if (!userID || isBorrowing) {
      console.log("Duplicate borrow blocked");
      return;
    }

    setIsBorrowing(true);

    axios
      .post("http://localhost:5000/borrow", { userID, itemID })
      .then((res) => {
        console.log("✅ Borrowed successfully:", res.data);
        alert(`✅ "${res.data.title}" borrowed successfully!`);
        fetchItems();
      })
      .catch((err) => {
        const message = err.response?.data?.message;

        if (message === "You already borrowed this item.") {
          alert("📚 You already borrowed this item.");
        } else if (message === "Item not available") {
          alert("🚫 This item is currently unavailable.");
        } else {
          alert("Borrow limit reached. You can only borrow up to 5 items.");
        }
      })
      .finally(() => {
        setTimeout(() => setIsBorrowing(false), 1000);
      });
  };

  const handleReturn = (itemID) => {
    axios
      .post("http://localhost:5000/return", { userID, itemID })
      .then((res) => {
        console.log("✅ Returned:", res.data);
        fetchItems();
        fetchBorrowed();
        fetchReturned();
        alert(`📘 "${res.data.title}" returned successfully!`);
      })  ;
  };

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
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Borrowed
        </button>
        <button
          className={`tab ${activeTab === "return" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("return")}
        >
          <ArrowUpTrayIcon className="h-5 w-5 mr-2" /> Return
        </button>
        <button
          className={`tab ${activeTab === "returned" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("returned")}
        >
          <ClockIcon className="h-5 w-5 mr-2" /> Returned
        </button>
      </div>

      {activeTab === "browse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.itemID}
              className="card bg-base-100 shadow-xl transition-transform hover:scale-105"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.title}</h2>
                {item.author && <p><strong>Author:</strong> {item.author}</p>}
                {item.artist && <p><strong>Artist:</strong> {item.artist}</p>}
                {item.ISBN && <p><strong>ISBN:</strong> {item.ISBN}</p>}
                {item.ISSN && <p><strong>ISSN:</strong> {item.ISSN}</p>}
                {item.trackCount && <p><strong>Tracks:</strong> {item.trackCount}</p>}
                <p><strong>Type:</strong> {item.itemType}</p>
                <p><strong>Availability:</strong> {item.availability}</p>
              </div>
              <div className="card-actions justify-center mb-4">
                <button
                  className="btn bg-[#8B0015] text-white hover:bg-secondary"
                  onClick={() => handleBorrow(item.itemID)}
                  disabled={isBorrowing}
                >
                  Borrow
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "borrow" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowed.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No borrowed items.</p>
          ) : (
            borrowed.map((item) => (
              <div
                key={item.itemID}
                className="card bg-base-100 shadow-xl transition-transform hover:scale-105"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.title}</h2>
                  <p><strong>Type:</strong> {item.itemType}</p>
                  {item.author && <p><strong>Author:</strong> {item.author}</p>}
                  {item.artist && <p><strong>Artist:</strong> {item.artist}</p>}
                  {item.ISBN && <p><strong>ISBN:</strong> {item.ISBN}</p>}
                  {item.ISSN && <p><strong>ISSN:</strong> {item.ISSN}</p>}
                  {item.trackCount && <p><strong>Tracks:</strong> {item.trackCount}</p>}
                  <p><strong>Borrowed:</strong> {item.borrowDate}</p>
                  <p><strong>Due:</strong> {item.dueDate}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "return" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowed.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No borrowed items to return.</p>
          ) : (
            borrowed.map((item) => (
              <div
                key={item.itemID}
                className="card bg-base-100 shadow-xl transition-transform hover:scale-105"
              >
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.title}</h2>
                  <p><strong>Type:</strong> {item.itemType}</p>
                  <p><strong>Borrowed:</strong> {item.borrowDate}</p>
                  <p><strong>Due:</strong> {item.dueDate}</p>
                </div>
                <div className="card-actions justify-center mb-4">
                  <button
                    className="btn bg-[#8B0015] text-white hover:bg-secondary"
                    onClick={() => handleReturn(item.itemID)}
                  >
                    Return
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === "returned" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {returned.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No returned items yet.</p>
          ) : (
            returned.map((item) => (
              <div key={item.itemID} className="card bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{item.title}</h2>
                  <p><strong>Type:</strong> {item.itemType}</p>
                  {item.author && <p><strong>Author:</strong> {item.author}</p>}
                  {item.artist && <p><strong>Artist:</strong> {item.artist}</p>}
                  {item.ISBN && <p><strong>ISBN:</strong> {item.ISBN}</p>}
                  {item.ISSN && <p><strong>ISSN:</strong> {item.ISSN}</p>}
                  {item.trackCount && <p><strong>Tracks:</strong> {item.trackCount}</p>}
                  <p><strong>Borrowed:</strong> {item.borrowDate}</p>
                  <p><strong>Due:</strong> {item.dueDate}</p>
                  <p><strong>Returned:</strong> {item.returnDate}</p>
                  {item.fine > 0 ? (
                    <p className="text-red-600 font-bold">Fine: ${item.fine.toFixed(2)}</p>
                  ) : (
                    <p className="text-green-600 font-semibold">No fine 🎉</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Browse;
