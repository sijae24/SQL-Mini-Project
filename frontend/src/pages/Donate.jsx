import { useState, useEffect } from "react";
import { GiftIcon, ClockIcon, BookOpenIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
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
  const [donationSuccess, setDonationSuccess] = useState(false);

  const userID = user?.userID;

  // Fetch library items and future items
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
        // Prepare item data with all possible fields
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

      setDonationSuccess(true);
      setTimeout(() => setDonationSuccess(false), 3000);

      // Refresh data
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
      alert(error.response?.data?.error || error.response?.data?.message || "Donation failed");
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

          {donationSuccess && (
            <div className="alert alert-success mt-4">
              <div className="flex-1">
                <CheckCircleIcon className="h-6 w-6" />
                <label>Thank you for your donation!</label>
              </div>
            </div>
          )}
        </div>
      </div>

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