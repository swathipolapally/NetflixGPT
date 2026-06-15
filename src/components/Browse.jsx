import React from 'react'
import Header from './Header';
import useNowPlayingMovies from '../utils/hooks/useNowPlayingMoviesHook';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../utils/hooks/usePopularMovies';
import useTopRatedMovies from '../utils/hooks/useToRatedMovies';
import useUpcomingMovies from '../utils/hooks/useUpComingMovies';
import useTrendingMovies from '../utils/hooks/useTrendingMovies';

const Browse = () => {
  /**
   * Fetch now playing movies from TMDB API and store it in Redux store
   */
  useNowPlayingMovies();

  usePopularMovies();

  useTopRatedMovies();

  useUpcomingMovies();

  useTrendingMovies();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <div className="relative z-10">
        <MainContainer />
        <SecondaryContainer />
      </div>
    </div>
  )
}

export default Browse
