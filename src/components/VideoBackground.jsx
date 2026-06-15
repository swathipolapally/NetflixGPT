import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../utils/store/slices/movieSlice';
import { useSelector } from 'react-redux';
import useTrailerVideo from '../utils/hooks/useTrailerVideo';

const VideoBackground = ({movieId}) => {
    const video = useSelector((state) => state.movies?.addTrailerVideo);

    /**
     * Fetch trailer video of the movie from TMDB API and store it in Redux store
     */
    useTrailerVideo(movieId);

    return (
        <div className="relative z-10 h-screen w-full overflow-hidden pointer-events-none">
            <iframe
                className="absolute inset-0 w-full h-full object-cover"
                src={`https://www.youtube.com/embed/${video?.key}?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
        </div>
    )
}

export default VideoBackground; 