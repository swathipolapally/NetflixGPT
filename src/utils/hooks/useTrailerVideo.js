import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../store/slices/movieSlice";
import { API_OPTIONS } from "../constants";


const useTrailerVideo = (movieId) => {
    
    const dispatch = useDispatch();


    const getMovieVideos = async () => { 
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_OPTIONS);
        const data = await response.json();
        return data.results;
    }

    useEffect(() => {
        getMovieVideos().then((videos) => {
            const video = videos.filter((v) => v.type === "Trailer");
            dispatch(addTrailerVideo(video[0]));
        });
    }, [movieId]);
}

export default useTrailerVideo;