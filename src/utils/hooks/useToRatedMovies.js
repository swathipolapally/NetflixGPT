import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../store/slices/movieSlice';
import { API_OPTIONS } from '../constants';


const useTopRatedMovies = () => {
    /**
     * Fetch Top Rated movies from TMDB API and store it in Redux store
     */
    
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated`, API_OPTIONS);
    const data = await response.json();
    console.log(data);
    dispatch(addTopRatedMovies(data.results));
  }

  useEffect(() => {
    getTopRatedMovies();
  }, []);
}

export default useTopRatedMovies;