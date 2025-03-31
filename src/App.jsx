import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import Header from './pages/Header';
import NotFound from './components/NotFound/NotFound';
import {CAST, HOME, MOVIE_CARD, MOVIES, REVIEWS} from "./constants/path";
import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const MovieCard = lazy(() => import('./components/MovieCard/MovieCard'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {

  return (
      <>
      <Routes>
        <Route path={HOME} element={<Header />}>
          <Route index element={<Home />} />
          <Route path={MOVIES} element={<Movies />} />
          <Route path={MOVIE_CARD} element={<MovieCard />} >
            <Route path={CAST} element={<MovieCast />} />
            <Route path={REVIEWS} element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
      </>
  )
}

export default App;
