import { useState, useEffect } from "react";
import { GiftIcon, ClockIcon, BookOpenIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Donate = ({ user }) => {
  const [donationType, setDonationType] = useState("existing");
  const [items, setItems] = useState([]);
  const [futureItems, setFutureItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [title, setTitle] = useState("");
  const [itemType, setItemType] = useState("Book");
  const [author, setAuthor] = useState("");
  const [artist, setArtist] = useState("");
  const [isbn, setIsbn] = useState("");
  const [issn, setIssn] = useState("");
  const [issueNumber, setIssueNumber] = useState("");
  const [trackCount, setTrackCount] = useState("");
  const [notification, setNotification] = useState(null);

  const userID = user?.userID;

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsRes, futureRes] = await Promise.all([
          axios.get("http://localhost:5000/library-items"),
          axios.get("http://localhost:5000/future-items"),
        ]);
        setItems(itemsRes.data);
        setFutureItems(futureRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        showNotification("An error occurred while fetching data.", "error");
      }
    };
    fetchData();
  }, []);

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      if (donationType === "existing") {
        await axios.post("http://localhost:5000/donate-item", {
          userID,
          itemID: selectedItem,
        });
      } else {
        // Prepare item data
        const itemData = {
          title,
          itemType,
          author: itemType === "Book" ? author : null,
          artist: itemType === "CD" ? artist : null,
          ISBN: itemType === "Book" ? isbn : null,
          ISSN: itemType === "Magazine" || itemType === "Journal" ? issn : null,
          issueNumber: itemType === "Magazine" ? issueNumber : null,
          trackCount: itemType === "CD" ? trackCount : null
        };

        const response = await axios.post("http://localhost:5000/add-future-item", itemData);
        await axios.post("http://localhost:5000/donate-item", {
          userID,
          itemID: response.data.itemID,
        });
      }

      showNotification("Donation successful!");
      
      const [itemsRes, futureRes] = await Promise.all([
        axios.get("http://localhost:5000/library-items"),
        axios.get("http://localhost:5000/future-items"),
      ]);
      setItems(itemsRes.data);
      setFutureItems(futureRes.data);

      // Reset form
      setSelectedItem("");
      setTitle("");
      setItemType("Book");
      setAuthor("");
      setIsbn("");
      setIssn("");
      setIssueNumber("");
      setTrackCount("");
      setArtist("");
    } catch (error) {
      console.error("Error donating item:", error);
      showNotification("An error occurred while donating the item.", "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <GiftIcon className="h-8 w-8 mr-2" /> Donate Items
      </h1>

      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="tabs tabs-boxed mb-6">
            <button className={`tab ${donationType === "existing" ? "tab-active" : ""}`} onClick={() => setDonationType("existing")}>
              <BookOpenIcon className="h-5 w-5 mr-2" /> Donate Existing Item
            </button>
            <button className={`tab ${donationType === "new" ? "tab-active" : ""}`} onClick={() => setDonationType("new")}>
              <ClockIcon className="h-5 w-5 mr-2" /> Donate New Item
            </button>
          </div>

          <form onSubmit={handleDonate}>
            {donationType === "existing" ? (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select Item to Donate</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  required
                >
                  <option value="">Choose an item</option>
                  {items.map((item) => (
                    <option key={item.itemID} value={item.itemID}>
                      {item.title} ({item.itemType})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Item Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter item title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text mt-2">Item Type</span>
                  </label>
                  <select className="select select-bordered w-full" value={itemType} onChange={(e) => setItemType(e.target.value)} required>
                    <option value="Book">Book</option>
                    <option value="Magazine">Magazine</option>
                    <option value="CD">CD</option>
                    <option value="DVD">DVD</option>
                    <option value="Journal">Journal</option>
                  </select>
                </div>
                {itemType === "Book" && (
                  <>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text mt-2">Author</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter author" 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text mt-2">ISBN</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter ISBN" 
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required 
                      />
                    </div>
                  </>
                )}
                {itemType === "Magazine" && (
                  <>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text mt-2">Issue Number</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter issue number" 
                        value={issueNumber}
                        onChange={(e) => setIssueNumber(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text mt-2">ISSN</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter ISSN" 
                        value={issn}
                        onChange={(e) => setIssn(e.target.value)}
                        required 
                      />
                    </div>
                  </>
                )}
                {itemType === "CD" && (
                  <>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text mt-2">Artist</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter artist" 
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        required 
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text mt-2">Track Count</span>
                      </label>
                      <input 
                        type="text" 
                        className="input input-bordered w-full" 
                        placeholder="Enter track count" 
                        value={trackCount}
                        onChange={(e) => setTrackCount(e.target.value)}
                        required 
                      />
                    </div>
                  </>
                )}
                {itemType === "Journal" && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text mt-2">ISSN</span>
                    </label>
                    <input 
                      type="text" 
                      className="input input-bordered w-full" 
                      placeholder="Enter ISSN" 
                      value={issn}
                      onChange={(e) => setIssn(e.target.value)}
                      required 
                    />
                  </div>
                )}
              </>
            )}

            <div className="card-actions justify-end mt-6">
              <button type="submit" className="btn btn-primary hover:bg-secondary">
                Donate Item
              </button>
            </div>
          </form>
        </div>
      </div>

      {notification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div
            className={`flex items-center p-4 rounded-lg shadow-lg animate-fade-in pointer-events-auto ${
              notification.type === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {notification.type === "success" ? <CheckCircleIcon className="h-6 w-6 mr-2" /> : <XCircleIcon className="h-6 w-6 mr-2" />}
            <div>
              <label>{notification.message}</label>
            </div>
          </div>
        </div>
      )}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">
            <ClockIcon className="h-5 w-5 mr-2" /> Upcoming Donations
          </h2>
          {futureItems.length === 0 ? (
            <p className="text-gray-500">No upcoming donations</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Arrival Date</th>
                  </tr>
                </thead>
                <tbody>
                  {futureItems.map((item) => (
                    <tr key={item.itemID}>
                      <td>{item.title}</td>
                      <td>{item.itemType}</td>
                      <td>{item.arrivalDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donate;