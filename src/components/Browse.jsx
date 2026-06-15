import React from 'react'
import Header from './Header';
import useNowPlayingMovies from '../utils/hooks/useNowPlayingMoviesHook';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  /**
   * Fetch now playing movies from TMDB API and store it in Redux store
   */
  useNowPlayingMovies();

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
