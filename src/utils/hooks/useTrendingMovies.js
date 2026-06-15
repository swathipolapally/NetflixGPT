import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrendingMovies } from '../store/slices/movieSlice';
import { API_OPTIONS } from '../constants';


const useTrendingMovies = () => {
    /**
     * Fetch Trending movies from TMDB API and store it in Redux store
     */
    
  const dispatch = useDispatch();

  const getTrendingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day`, API_OPTIONS);
    const data = await response.json();
    dispatch(addTrendingMovies(data.results));
  }

  useEffect(() => {
    getTrendingMovies();
  }, []);
}

export default useTrendingMovies;