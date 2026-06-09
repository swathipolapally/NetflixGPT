import React from 'react'
import Header from './Header';
import { API_OPTIONS } from '../utils/constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/store/slices/movieSlice';

const Browse = () => {
  const dispatch = useDispatch();

  const getNOwPlayingMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page`, API_OPTIONS);
    const data = await response.json();
    dispatch(addNowPlayingMovies(data.results));
  }

  useEffect(() => {
    getNOwPlayingMovies();
  }, []);

  return (
    <div>
      <Header />
    </div>
  )
}

export default Browse
