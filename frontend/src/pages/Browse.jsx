import { useState, useEffect } from "react";
import axios from "axios";
import { BookOpenIcon, ArrowDownTrayIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ItemCard from "../components/ItemCard";

const Browse = ({ user }) => {
  const [activeTab, setActiveTab] = useState("browse");
  const [items, setItems] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [returned, setReturned] = useState([]);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [borrowSuccess, setBorrowSuccess] = useState(false);
  const [returnSuccess, setReturnSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const userID = user?.userID;

  // Function to fetch library items
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/library-items");
      const sortedItems = res.data
        .filter((item) => item.availability > 0)
        .sort((a, b) => {
          const typeOrder = { Book: 1, Magazine: 2, CD: 3, Journal: 4 };
          const typeCompare = (typeOrder[a.itemType] || 5) - (typeOrder[b.itemType] || 5);
          if (typeCompare !== 0) return typeCompare;
          return a.title.localeCompare(b.title);
        });

      setItems(sortedItems);
    } catch (err) {
      console.error("Error fetching library items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Function to fetch borrowed items
  const fetchBorrowed = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/borrowed-items/${userID}`);
      setBorrowed(res.data);
    } catch (err) {
      console.error("Error fetching borrowed items:", err);
    }
  };

  // Function to fetch returned items
  const fetchReturned = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/returned-items/${userID}`);
      setReturned(res.data);
    } catch (err) {
      console.error("Error fetching returned items:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "borrowed" && userID) {
      fetchBorrowed();
    } else if (activeTab === "returned" && userID) {
      fetchReturned();
    }
  }, [activeTab, userID]);

  // Function to handle item borrow
  const handleBorrow = async (itemID) => {
    if (!userID || isBorrowing) {
      console.log("Duplicate borrow blocked");
      return;
    }

    setIsBorrowing(true);

    try {
      const res = await axios.post("http://localhost:5000/borrow", { userID, itemID });
      console.log("✅ Borrowed successfully:", res.data);
      setBorrowSuccess(res.data.title);
      setTimeout(() => setBorrowSuccess(false), 3000);
      fetchItems();
    } catch (err) {
      const message = err.response?.data?.message;

      if (message === "You already borrowed this item.") {
        alert("📚 You already borrowed this item.");
      } else if (message === "Item not available") {
        alert("🚫 This item is currently unavailable.");
      } else {
        alert("Borrow limit reached. You can only borrow up to 5 items.");
      }
    } finally {
      setTimeout(() => setIsBorrowing(false), 1000);
    }
  };

  // Function to handle item return
  const handleReturn = async (itemID) => {
    try {
      const res = await axios.post("http://localhost:5000/return", { userID, itemID });
      console.log("✅ Returned:", res.data);
      setReturnSuccess(res.data.title);
      setTimeout(() => setReturnSuccess(false), 3000);
      fetchItems();
      fetchBorrowed();
      fetchReturned();
    } catch (err) {
      console.error("Error returning item:", err);
    }
  };

  // Function to filter library items based on search term and selected type
  const filterItems = (itemsToFilter) => {
    //  Check if any value in the item matches
    return itemsToFilter.filter(
      (item) =>
        (searchTerm === "" ||
          Object.values(item).some((value) => value !== null && String(value).toLowerCase().includes(searchTerm.toLowerCase()))) &&
        (selectedType === "all" || item.itemType === selectedType)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <BookOpenIcon className="h-8 w-8 mr-2" /> Browse Library Items
      </h1>

      {borrowSuccess && (
        <div className="alert alert-success mb-6">
          <div className="flex-1">
            <CheckCircleIcon className="h-6 w-6" />
            <label>Successfully borrowed "{borrowSuccess}"! Due in 7 days.</label>
          </div>
        </div>
      )}
      
      {returnSuccess && (
        <div className="alert alert-success mb-6">
          <div className="flex-1">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <label>Successfully returned "{returnSuccess}"! Thank you.</label>
          </div>
        </div>
      )}

      {/* Tabs for browse, borrow, return, and returned */}
      <div className="tabs tabs-boxed mb-8">
        <button className={`tab ${activeTab === "browse" ? "tab-active" : ""}`} onClick={() => setActiveTab("browse")}>
          <BookOpenIcon className="h-5 w-5 mr-2" /> Browse
        </button>
        <button className={`tab ${activeTab === "borrowed" ? "tab-active" : ""}`} onClick={() => setActiveTab("borrowed")}>
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Borrowed
        </button>
        <button className={`tab ${activeTab === "returned" ? "tab-active" : ""}`} onClick={() => setActiveTab("returned")}>
          <ClockIcon className="h-5 w-5 mr-2" /> Returned
        </button>
      </div>

      {/* Search and type filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by title, author, etc..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <select className="select select-bordered w-full" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Book">Books</option>
            <option value="Magazine">Magazines</option>
            <option value="CD">CDs</option>
            <option value="Journal">Journals</option>
          </select>
        </div>
      </div>

      {activeTab === "browse" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterItems(items).length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No items found matching your criteria.</p>
          ) : (
            filterItems(items).map((item) => <ItemCard key={item.itemID} item={item} onBorrow={handleBorrow} />)
          )}
        </div>
      )}

      {activeTab === "borrowed" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterItems(borrowed).length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No borrowed items to return.</p>
          ) : (
            filterItems(borrowed).map((item) => <ItemCard key={item.itemID} item={item} onReturn={handleReturn} />)
          )}
        </div>
      )}

      {activeTab === "returned" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterItems(returned).length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No returned items yet.</p>
          ) : (
            filterItems(returned).map((item) => <ItemCard key={item.itemID} item={item} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Browse;
