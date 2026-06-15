import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPopularMovies } from '../store/slices/movieSlice';
import { API_OPTIONS } from '../constants';


const usePopularMovies = () => {
    /**
     * Fetch Popular movies from TMDB API and store it in Redux store
     */
    
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular`, API_OPTIONS);
    const data = await response.json();
    console.log(data);
    dispatch(addPopularMovies(data.results));
  }

  useEffect(() => {
    getPopularMovies();
  }, []);
}

export default usePopularMovies;