import React from "react";
import {IMG_CDN_URL} from '../utils/constants'

const MovieCard = ({id, posterPath}) => {
    return(
        <div className="w-32 pr-1 object-fit">
            <img className="rounded-md" src={ IMG_CDN_URL + posterPath}/>
        </div>
    )
}

export default MovieCard;