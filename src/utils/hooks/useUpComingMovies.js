import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../store/slices/movieSlice';
import { API_OPTIONS } from '../constants';


const useUpcomingMovies = () => {
    /**
     * Fetch Upcoming movies from TMDB API and store it in Redux store
     */
    
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming`, API_OPTIONS);
    const data = await response.json();
    console.log(data);
    dispatch(addUpcomingMovies(data.results));
  }

  useEffect(() => {
    getUpcomingMovies();
  }, []);
}

export default useUpcomingMovies;