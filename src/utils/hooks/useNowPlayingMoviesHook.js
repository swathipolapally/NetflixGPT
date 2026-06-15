import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../store/slices/movieSlice';
import { API_OPTIONS } from '../constants';


const useNowPlayingMovies = () => {
    /**
     * Fetch now playing movies from TMDB API and store it in Redux store
     */
    
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page`, API_OPTIONS);
    const data = await response.json();
    dispatch(addNowPlayingMovies(data.results));
  }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}

export default useNowPlayingMovies;