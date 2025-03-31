import { BookOpenIcon, FilmIcon, MusicalNoteIcon, NewspaperIcon, BookmarkIcon } from "@heroicons/react/24/outline";

const ItemCard = ({ item, onBorrow, onReturn }) => {
  return (
    <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105">
      <div className="card-body">
      <div className="flex items-center gap-2">
          {item.itemType === "Book" && <BookOpenIcon className="h-5 w-5 text-blue-500" />}
          {item.itemType === "DVD" && <FilmIcon className="h-5 w-5 text-purple-500" />}
          {item.itemType === "CD" && <MusicalNoteIcon className="h-5 w-5 text-green-500" />}
          {item.itemType === "Magazine" && <NewspaperIcon className="h-5 w-5 text-red-500" />}
          {item.itemType === "Journal" && <BookmarkIcon className="h-5 w-5 text-orange-500" />}
          <h2 className="card-title">{item.title}</h2>
        </div>
        {item.author && (
          <p>
            <strong>Author:</strong> {item.author}
          </p>
        )}
        {item.artist && (
          <p>
            <strong>Artist:</strong> {item.artist}
          </p>
        )}
        {item.ISBN && (
          <p>
            <strong>ISBN:</strong> {item.ISBN}
          </p>
        )}
        {item.ISSN && (
          <p>
            <strong>ISSN:</strong> {item.ISSN}
          </p>
        )}
        {item.issueNumber && (
          <p>
            <strong>Issue Number:</strong> {item.issueNumber}
          </p>
        )}
        {item.trackCount && (
          <p>
            <strong>Tracks:</strong> {item.trackCount}
          </p>
        )}
        <p>
          <strong>Type:</strong> {item.itemType}
        </p>
        {item.availability !== undefined && (
          <p>
            <strong>Availability:</strong> {item.availability}
          </p>
        )}
        {item.location && (
          <p>
            <strong>Location:</strong> {item.location}
          </p>
        )}
        {item.borrowDate && (
          <p>
            <strong>Borrowed:</strong> {item.borrowDate}
          </p>
        )}
        {item.dueDate && (
          <p>
            <strong>Due:</strong> {item.dueDate}
          </p>
        )}
        {item.returnDate && (
          <p>
            <strong>Returned:</strong> {item.returnDate}
          </p>
        )}
        {item.fine !== undefined &&
          (item.fine > 0 ? (
            <p className="text-red-600 font-bold">Fine: ${item.fine.toFixed(2)}</p>
          ) : (
            <p className="text-green-600 font-semibold">No fine 🎉</p>
          ))}
      </div>
      {(onBorrow || onReturn) && (
        <div className="card-actions justify-end mr-4 mb-4">
          <button
            className="btn bg-[#8B0015] text-white hover:bg-secondary"
            onClick={() => (onBorrow ? onBorrow(item.itemID) : onReturn(item.itemID))}
          >
            {onBorrow ? "Borrow" : "Return"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;