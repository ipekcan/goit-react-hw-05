import React, { useState, useEffect, useRef } from "react";
import BackArrow from "../../components/icons/BackArrow";
import { useParams, useLocation, NavLink } from "react-router-dom";
import movieCardCss from "./MovieCard.module.css";
import axios from "axios";
import { Outlet,Link } from "react-router-dom";

const MovieCard = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(()=> {
    fetchMovie();
    fetchCast();
    fetchReviews();
  },[movieId]);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzFjNWViZjAyNzFjNmRiOWEyMTI3ZGZkNmZlYjYxZSIsIm5iZiI6MTc0MjY2NjU0OC40NDIsInN1YiI6IjY3ZGVmYjM0ZjZhMGZjYmQwMDRkNzQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KBQ09i8FozQ3h7FYPVu6jdctYjhgtCevFBWl8Y5UeqY",
    },
  };
  
  const fetchMovie = () => { axios
  .request(options)
  .then(res => setMovie(res.data))
  .catch(err => console.error(err))
    
};

  const getYear = (date) => {
    const d = new Date(date);
    return d.getFullYear();
  };
  
  const optionsCast = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzFjNWViZjAyNzFjNmRiOWEyMTI3ZGZkNmZlYjYxZSIsIm5iZiI6MTc0MjY2NjU0OC40NDIsInN1YiI6IjY3ZGVmYjM0ZjZhMGZjYmQwMDRkNzQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KBQ09i8FozQ3h7FYPVu6jdctYjhgtCevFBWl8Y5UeqY",
    },
  };
  const fetchCast = () => { axios
    .request(optionsCast)
    .then(res => setCast(res.data))
    .catch(err => console.error(err))
  };
  
  const optionsReviews = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    params: {language: 'en-US', page: '1'},
    headers: {accept: 'application/json',
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzFjNWViZjAyNzFjNmRiOWEyMTI3ZGZkNmZlYjYxZSIsIm5iZiI6MTc0MjY2NjU0OC40NDIsInN1YiI6IjY3ZGVmYjM0ZjZhMGZjYmQwMDRkNzQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KBQ09i8FozQ3h7FYPVu6jdctYjhgtCevFBWl8Y5UeqY",
    }
  };
  
  const fetchReviews = () => axios
    .request(optionsReviews)
    .then(res => setReviews(res.data))
    .catch(err => console.error(err));


  return (
    <>
      <div>
        <BackArrow /><NavLink to={backLinkRef.current}> Go Back</NavLink>
      </div>
      <div className={`${movieCardCss.container}`}>
        <div className={`${movieCardCss.poster}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={`${movieCardCss.movieCardDetail}`}>
          <p>
            {movie.title} <span>{`(${getYear(movie.release_date)})`}</span>
          </p>
          <br />
          <p>
            <b>User Score:</b> <span>{`${movie.vote_average * 10}%`}</span>
          </p>
          <br />
          <p>
            <b>Overview:</b> <span>{`${movie.overview}`}</span>
          </p>
          <br />
          <p>
            <b>Genres:</b>
          </p>
          <ul className={`${movieCardCss.genres}`}>
          {movie?.genres &&
            movie.genres.map((item) => {
              return (
                <li key={`${item.id}`}>{item.name}</li>
              );
            })
          }
          </ul>
        </div>
      </div>
      <hr/>
          <p>Additional Information</p>
      <ul>
        <li>
          <Link to={`/movies/${movieId}/cast`} state={cast}>Cast</Link>
        </li>
        <li>
        <Link to={`/movies/${movieId}/reviews`} state={reviews}>Reviews</Link>
        </li>
      </ul>
      <hr/>
      <Outlet/>
    </>
  );
};

export default MovieCard;
