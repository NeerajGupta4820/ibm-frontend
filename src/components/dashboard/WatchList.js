import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchlist } from '../../redux/reducers/watchlistReducer';
import { useCreatePaymentMutation } from '../../redux/api/paymentApi';
import { loadStripe } from '@stripe/stripe-js';
import '../../style/dashboard/watchlist.css'; 

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Watchlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchlistItems = useSelector((state) => state.watchlist.watchlistItems);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.user.user);
  const itemsPerPage = 10;
  const [createPayment, { isLoading: isCreatingPayment }] = useCreatePaymentMutation(); 
  const [clientSecret, setClientSecret] = useState('');

  const handleRemoveFromWatchlist = (item) => {
    dispatch(removeFromWatchlist({ tutorId: item.tutorId, userId: item.userId }));
  };

  const handlePayment = async () => {
    const totalFees = watchlistItems.reduce((total, item) => total + item.fee, 0);
  
    try {
      const response = await createPayment({ userId: user.id, amount: totalFees });
      console.log("Raw response:", response);
      const data = response.data;
  
      if (data && data.clientSecret) {
        setClientSecret(data.clientSecret);
        navigate('/pay', { state: { clientSecret: data.clientSecret } });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
      toast.error("Payment creation failed: " + (error.message || "An unknown error occurred"));
    }
  };
  

  if (!watchlistItems || watchlistItems.length === 0) {
    return <div className="watchlist-container"><p>Your watchlist is empty.</p></div>;
  }

  const totalPages = Math.ceil(watchlistItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = watchlistItems.slice(startIndex, endIndex);
  const totalFees = watchlistItems.reduce((total, item) => total + item.fee, 0);

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
                  src={item.tutorPhoto}
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
      <div className="payment-section">
        <h2>Payment Summary</h2>
        <p>Total Tutors: {watchlistItems.length}</p>
        <p>Total Fees: Rs.{totalFees}</p>
        <button onClick={handlePayment} className="payment-button" disabled={isCreatingPayment}>
          {isCreatingPayment ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
};

export default Watchlist;
