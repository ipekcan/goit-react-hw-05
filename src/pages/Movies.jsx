import SearchButton from "../components/SearchButton/SearchButton";
import SearchTextBox from "../components/SearchTextBox/SearchTextBox";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loader } from "../components/Loader/Loader";

const Movies = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const movieName = searchParams.get('movieName') ?? '';
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (movieName === '') {
      return;
    }
    setMoviesList([]);
    setIsLoading(true);
    
    searchMovies(movieName).then(() => {
    
      setError(false);
      setIsLoading(false);
      
    });
  }, [movieName]);

  const handleSearch = e => {
    e.preventDefault();
    const elem = document.getElementById("movieSearchTB");
    setSearchParams({ movieName: elem.value });
    
    elem.value = "";
    
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNzFjNWViZjAyNzFjNmRiOWEyMTI3ZGZkNmZlYjYxZSIsIm5iZiI6MTc0MjY2NjU0OC40NDIsInN1YiI6IjY3ZGVmYjM0ZjZhMGZjYmQwMDRkNzQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KBQ09i8FozQ3h7FYPVu6jdctYjhgtCevFBWl8Y5UeqY'
    }
  };
  
  const searchMovies = async (query) => fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setMoviesList(res))
    .catch(err => console.error(err));

    return (
      <>
      <SearchTextBox />
      <SearchButton handleSearch={handleSearch} />
      {error && <p>There is no movies with this request. Please, try again</p>}
      {moviesList?.results && moviesList.results.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title || movie.name}
              </Link>
            </li>
          );
        })}
        {isLoading && <Loader />}  
      </>
    )
  };
  
  export default Movies;