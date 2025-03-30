const ItemCard = ({ item, onBorrow, onReturn}) => {
  return (
    <div className="card bg-base-100 shadow-xl transition-transform hover:scale-105">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item.title}</h2>
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
        <div className="card-actions justify-center mb-4">
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
