import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
    const movies = useSelector((state) => state.movies);
    return (
        <div className='bg-black'>
            <div className='-mt-32 relative z-20 '>
                <MovieList title="Trending Movies" movies={movies?.trendingMovies} />
                <MovieList title="Top Rated Movies" movies={movies?.topRatedMovies} />
                <MovieList title="Upcoming Movies" movies={movies?.upcomingMovies} />
                <MovieList title="Now Playing Movies" movies={movies.nowPlayingMovies} />
                <MovieList title="Popular Movies" movies={movies?.popularMovies} />

            </div>
        </div>
    )
}

export default SecondaryContainer;