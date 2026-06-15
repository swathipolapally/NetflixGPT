import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';


const MainContainer = () => {
    const movies = useSelector((state) => state.movies?.nowPlayingMovies);
    
    if (!movies) return null;

    const mainMovie = movies[0];
    const { original_title, overview, id } = mainMovie;
    console.log(mainMovie); // --- IGNORE ---

    return (
        <div>
            <VideoTitle mainMovie={mainMovie} />
            <VideoBackground movieId={id} />
        </div>
    )
}

export default MainContainer