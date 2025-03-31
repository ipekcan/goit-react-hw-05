import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import movieReviewsCss from "./MovieReviews.module.css";


const MovieReviews = () => {

  
  const { movieId } = useParams();
  const location = useLocation();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  },[])

const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
  params: {language: 'en-US', page: '1'},
  headers: {accept: 'application/json',Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzFjNWViZjAyNzFjNmRiOWEyMTI3ZGZkNmZlYjYxZSIsIm5iZiI6MTc0MjY2NjU0OC40NDIsInN1YiI6IjY3ZGVmYjM0ZjZhMGZjYmQwMDRkNzQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KBQ09i8FozQ3h7FYPVu6jdctYjhgtCevFBWl8Y5UeqY",}
};

const fetchReviews = () => axios
  .request(options)
  .then(res => setReviews(res.data))
  .catch(err => console.error(err));

  return (
    <ul className={`${movieReviewsCss.reviews}`}>
      {(reviews.results)? 
        reviews.results.map((item) => {
          return (
            <li key={`${item.id}`}>
              <p>Author: {item.author}</p>
              <p>Content: {item.content}</p>
            </li>
          );
        }):<li> <p>"No review exists!"</p></li>
      } 
    </ul>
  )
}

export default MovieReviews