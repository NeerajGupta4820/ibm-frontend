import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/searchresults.css';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setResults([]); // Clear previous results on new search
      setError(null); // Clear previous errors

      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/tutors/search?name=${encodeURIComponent(query)}`);
        if (response.data.length > 0) {
          setResults(response.data);
        } else {
          setResults([]); // Explicitly set results to empty array if no data
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Error fetching search results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query]);

  const handleCardClick = (id) => {
    navigate(`/tutor/${id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="search-results">
      <h1>Search Results</h1>
      {error && <p>{error}</p>}
      {results.length === 0 ? (
        <p className="no-results">No results found.</p>
      ) : (
        <div className="search-results-container">
          {results.map(result => (
            <div
              key={result._id}
              className="search-results-card"
              onClick={() => handleCardClick(result._id)}
            >
              {result.photo && (
                <img
                  src={`${process.env.REACT_APP_SERVER}/${result.photo}`}
                  alt={`${result.name}'s photo`}
                  className="search-results-photo"
                />
              )}
              <h3>{result.name}</h3>
              <p>{result.bio}</p>
              <p>Availability: {result.availability}</p>
              <p>Ratings: {result.ratings}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
