import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null); // Added state for error handling
  const cardsRef = useRef();

  const VITE_TMDB_AUTHORIZATION = import.meta.env.VITE_TMDB_AUTHORIZATION;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_TMDB_AUTHORIZATION}`
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response Data:', data); // Log the API response data
        if (data.results) {
          setApiData(data.results);
        } else {
          console.error('No results found in API response');
        }
      } catch (err) {
        console.error('API request failed:', err);
        setError(err.message); // Set the error message
      }
    };

    fetchData();

    // Add wheel event listener
    const refCurrent = cardsRef.current;
    if (refCurrent) {
      refCurrent.addEventListener('wheel', handleWheel);
    }

    // Cleanup event listener on unmount
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category, options]);

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {error && <p className='error-message'>{error}</p>} {/* Display error message if exists */}
        {apiData.length > 0 ? apiData.map((card) => (
          <Link to={`/player/${card.id}`} className='card' key={card.id}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        )) : <p>No data available</p>}
      </div>
    </div>
  );
};

export default TitleCards;
