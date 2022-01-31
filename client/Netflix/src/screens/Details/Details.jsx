import { useState } from "react";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Redirect } from "react-router-dom";
import { addToList, playVideo } from "../../clientUtils/clientUtils";
import style from './Details.module.css';

const Details = ({ data, movieDetails, watchList, setWatchList, setMovieToPlay }) => {
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    return (
        <div className={style.Details}>
            <img src={movieDetails.posterUrl} />
            <article className={style.DetailsDisplay}>
                <h2>{movieDetails.title}</h2>
                <h3>{movieDetails.year}</h3>
                <p>{movieDetails.actors}</p>
                <p>{movieDetails.plot}</p>
                <button onClick={() => playVideo(data, movieDetails.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle fontSize="xx-large" color="white" /></button>
                <button onClick={() => addToList(data, movieDetails.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle fontSize="xx-large" color="white" /></button>
                <button ><BsHandThumbsUp fontSize="xx-large" color="white" /></button>
            </article>
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>)
}

export default Details;