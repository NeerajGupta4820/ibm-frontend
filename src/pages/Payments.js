import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCreditCard, FaMoneyCheck, FaPaypal } from 'react-icons/fa';
import '../style/payments.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({ amount: '', userId: '' });
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // Fetch payments
    const fetchPayments = async () => {
      const response = await axios.get('/api/payments');
      setPayments(response.data);
    };
    fetchPayments();
  }, []);

  const createPayment = async () => {
    try {
      const response = await axios.post(`/api/payments/create/${newPayment.userId}`, { amount: newPayment.amount });
      setPaymentIntentId(response.data.clientSecret);
      alert('Payment created successfully');
    } catch (error) {
      console.error('Error creating payment', error);
      alert('Error creating payment');
    }
  };

  const updatePaymentStatus = async () => {
    try {
      await axios.post('/api/payments/update-status', { paymentIntentId, status });
      alert('Payment status updated successfully');
    } catch (error) {
      console.error('Error updating payment status', error);
      alert('Error updating payment status');
    }
  };

  return (
    <div className="payments-page">
      <div className="payments-image">
        <img src="../assets/payment/img.webp" alt="Payments" />
      </div>
      <div className="payments-container">
        <h1>Payments</h1>
        <div className="create-payment">
          <h2>Create Payment</h2>
          <input
            type="text"
            placeholder="User ID"
            value={newPayment.userId}
            onChange={(e) => setNewPayment({ ...newPayment, userId: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={newPayment.amount}
            onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
          />
          <button onClick={createPayment}>Create Payment</button>
        </div>

        <div className="update-payment">
          <h2>Update Payment Status</h2>
          <input
            type="text"
            placeholder="Payment Intent ID"
            value={paymentIntentId}
            onChange={(e) => setPaymentIntentId(e.target.value)}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Select Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
          <button onClick={updatePaymentStatus}>Update Status</button>
        </div>

        <div className="payment-list">
          <h2>Payment List</h2>
          {payments.map((payment) => (
            <div className="payment-card" key={payment._id}>
              <h3>{payment.name}</h3>
              <p>Amount: ₹{payment.amount}</p>
              <p>Status: {payment.status}</p>
              <p>Payment Intent ID: {payment.paymentIntentId}</p>
              <div className="payment-icons">
                <FaCreditCard />
                <FaMoneyCheck />
                <FaPaypal />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
