import React, { useState } from 'react';
import { useCreateReviewMutation } from '../../redux/api/reviewApi'; 
import "../../style/review/tutorreview.css"; 
import toast from "react-hot-toast";

const TutorReview = ({ reviews, reviewedEntityId, reviewedEntityType }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [createReview] = useCreateReviewMutation();

  const handleCreateReview = async () => {
    if (reviewText.trim() === '') {
      toast.error("Comment cannot be empty");
      return;
    }
  
    try {
      const user = localStorage.getItem('user');
      const userObj = user ? JSON.parse(user) : null;
  
      if (!userObj || !userObj.id) {
        console.error('User ID not found in localStorage');
        return;
      }
  
      const reviewData = {
        reviewText,
        rating,
        reviewedEntityId,
        reviewedEntityType,
        userId: userObj.id,
      };
      
      const response = await createReview(reviewData).unwrap();
      
      if (response?.message) {
        toast.success(response.message);
        setReviewText('');
        setRating(0);
        // Optionally reload or update the reviews list here
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (error) {
      console.error('Failed to create or update review:', error);
      toast.error(error?.data?.message || "Failed to create or update review");
    }
  };
  
  

  return (
    <div className="tutor-reviews">
      <h2>Customer Reviews</h2>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-header">
                <img src={review.userId ? review.userId.photo : 'default-avatar.png'} alt="User" className="user-photo" />
                <p className="user-name">{review.userId ? review.userId.name : 'Anonymous'}</p>
              </div>
              <div className="review-rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                ))}
              </div>
              <p className="review-comment"><strong>Comment:</strong> {review.reviewText}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
      <div className="create-review">
        <h3>Create Review</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Comment"
          className="review-input"
          required
        />
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          className="rating-input"
          required
        />
        <button onClick={handleCreateReview} className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default TutorReview;
