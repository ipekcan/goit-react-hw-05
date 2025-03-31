import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import movieCastCss from "./MovieCast.module.css";


const MovieCast = () => {
const { movieId } = useParams();
const location = useLocation();
const [cast, setCast] = useState([]);

useEffect(() => {
  fetchCast();
},[])

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

  
   return (
     <ul className={`${movieCastCss.casts}`}>
       {cast?.cast &&
         cast.cast.map((item) => {
           return (
             <li key={`${item.id}`}>
                <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt={item.name} width={100}/>
                <p>Name: {item.name}</p>
                <p>Character: {item.character}</p>
             </li>
           );
         })
       }
     </ul>
   );
}

export default MovieCast;