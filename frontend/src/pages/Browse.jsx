import { useState, useEffect } from "react";
import axios from "axios";
import { BookOpenIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, ClockIcon } from "@heroicons/react/24/outline";
import ItemCard from "../components/ItemCard";

const Browse = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [items, setItems] = useState([]);
  const [borrowed, setBorrowed] = useState([]);
  const [returned, setReturned] = useState([]);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const userID = JSON.parse(localStorage.getItem("user"))?.userID;

  // Function to fetch library items
  const fetchItems = () => {
    axios
      .get("http://localhost:5000/library-items")
      .then((res) => {
        const sortedItems = res.data
          .filter((item) => item.availability > 0)
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

  // Function to fetch borrowed items
  const fetchBorrowed = () => {
    axios
      .get(`http://localhost:5000/borrowed-items/${userID}`)
      .then((res) => setBorrowed(res.data))
      .catch((err) => console.error("Error fetching borrowed items:", err));
  };

  // Function to fetch returned items
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

  // Function to handle item borrow
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

  // Function to handle item return
  const handleReturn = (itemID) => {
    axios.post("http://localhost:5000/return", { userID, itemID }).then((res) => {
      console.log("✅ Returned:", res.data);
      fetchItems();
      fetchBorrowed();
      fetchReturned();
      alert(`📘 "${res.data.title}" returned successfully!`);
    });
  };

  // Function to filter library items based on search term and selected type
  const filterItems = (itemsToFilter) => {
    return itemsToFilter.filter(item => {
      // Check if any value in the item matches the search term 
      const matchesSearch = searchTerm === "" || 
        Object.values(item).some(value => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
      
      const matchesType = selectedType === "all" || item.itemType === selectedType;
      
      return matchesSearch && matchesType;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="tabs tabs-boxed mb-8">
        <button className={`tab ${activeTab === "browse" ? "tab-active" : ""}`} onClick={() => setActiveTab("browse")}>
          <BookOpenIcon className="h-5 w-5 mr-2" /> Browse
        </button>
        <button className={`tab ${activeTab === "borrow" ? "tab-active" : ""}`} onClick={() => setActiveTab("borrow")}>
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" /> Borrowed
        </button>
        <button className={`tab ${activeTab === "return" ? "tab-active" : ""}`} onClick={() => setActiveTab("return")}>
          <ArrowUpTrayIcon className="h-5 w-5 mr-2" /> Return
        </button>
        <button className={`tab ${activeTab === "returned" ? "tab-active" : ""}`} onClick={() => setActiveTab("returned")}>
          <ClockIcon className="h-5 w-5 mr-2" /> Returned
        </button>
      </div>

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

      {activeTab === "borrow" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterItems(borrowed).length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No borrowed items.</p>
          ) : (
            filterItems(borrowed).map((item) => <ItemCard key={item.itemID} item={item} />)
          )}
        </div>
      )}

      {activeTab === "return" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterItems(borrowed).length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No borrowed items to return.</p>
          ) : (
            filterItems(borrowed).map((item) => <ItemCard key={item.itemID} item={item} onReturn={handleReturn} showReturnButton={true} />)
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
