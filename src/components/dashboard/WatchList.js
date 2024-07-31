import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchlist } from '../../redux/reducers/watchlistReducer';
import '../../style/dashboard/watchlist.css'; // Ensure this path is correct

const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlistItems = useSelector((state) => state.watchlist.watchlistItems);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust the number of items per page here

  const handleRemoveFromWatchlist = (item) => {
    dispatch(removeFromWatchlist({ tutorId: item.tutorId, userId: item.userId }));
  };

  if (!watchlistItems || watchlistItems.length === 0) {
    return <div className="watchlist-container"><p>Your watchlist is empty.</p></div>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(watchlistItems.length / itemsPerPage);

  // Calculate items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = watchlistItems.slice(startIndex, endIndex);

  // Pagination controls
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="watchlist-container">
      <h1>Watchlist</h1>
      <table className="watchlist-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Fee</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.tutorId}>
              <td>
                <img
                  src={`${process.env.REACT_APP_SERVER}/${item.tutorPhoto}`}
                  alt={`${item.tutorName}'s photo`}
                  className="watchlist-card-photo"
                />
              </td>
              <td>{item.tutorName}</td>
              <td>{item.subject}</td>
              <td>Rs.{item.fee}</td>
              <td>
                <button onClick={() => handleRemoveFromWatchlist(item)} className="watchlist-card-remove-button">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Watchlist;
