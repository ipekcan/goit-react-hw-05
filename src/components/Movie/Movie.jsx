import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Movie = () => {

    const [movieList, setMovieList] = useState([]);

    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

    const options = {
      headers: {
        // api_read_access_token yerine kendi tokeninizi yerleştirin
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzFjNWViZjAyNzFjNmRiOWEyMTI3ZGZkNmZlYjYxZSIsIm5iZiI6MTc0MjY2NjU0OC40NDIsInN1YiI6IjY3ZGVmYjM0ZjZhMGZjYmQwMDRkNzQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KBQ09i8FozQ3h7FYPVu6jdctYjhgtCevFBWl8Y5UeqY'
      }
    };
  
    const getPopularMovies = () => axios.get(url, options)
        .then(response =>
      setMovieList(response.data.results))
        .catch(err => console.error(err));

    useEffect(()=> {
            getPopularMovies()
    }, []);

    
  return (
    <div>
        {movieList.map((movie) => (
            <li key={movie.id}><Link to={`/movies/${movie.id}`} state={movie}>{movie.title}</Link> </li>
        ))}
    </div>
  )
}

export default Movie