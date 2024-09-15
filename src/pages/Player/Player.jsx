import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const VITE_TMDB_AUTHORIZATION = import.meta.env.VITE_TMDB_AUTHORIZATION;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_TMDB_AUTHORIZATION}`
    }
  };

  useEffect(() => {
    if (!VITE_TMDB_AUTHORIZATION) {
      setError("API key is missing");
      setLoading(false);
      return;
    }

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        // Find the YouTube video in the response
        const youtubeVideo = data.results.find(video => video.site === 'YouTube');
        if (youtubeVideo) {
          setApiData(youtubeVideo);
        } else {
          setError("No YouTube video available");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("An error occurred");
        setLoading(false);
      });
  }, [id, VITE_TMDB_AUTHORIZATION]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt='Back'
        onClick={() => navigate(-1)}
        className='back-arrow-icon'
        style={{ cursor: 'pointer' }}
      />
      {apiData ? (
        <iframe
          width='100%'
          height='100%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <div>No video available</div>
      )}
    </div>
  );
};

export default Player;
