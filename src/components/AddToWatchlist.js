import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToWatchlist, removeFromWatchlist } from '../../redux/slices/watchlistSlice';

const AddToWatchlist = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const watchlistItems = useSelector((state) => state.watchlist.watchlistItems);
  const isTutorInWatchlist = watchlistItems.some((item) => item.tutorId === id);

  const handleAddToWatchlist = () => {
    dispatch(addToWatchlist({ tutorId: id, dateAdded: new Date().toISOString() }));
  };

  const handleRemoveFromWatchlist = () => {
    dispatch(removeFromWatchlist(id));
  };

  return (
    <div>
      {isTutorInWatchlist ? (
        <button onClick={handleRemoveFromWatchlist}>Remove from Watchlist</button>
      ) : (
        <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
      )}
    </div>
  );
};

export default AddToWatchlist;
