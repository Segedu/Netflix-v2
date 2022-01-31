import Spinner from "../../components/Spinner/Spinner";
import { useState } from "react";
import { showObjDetails, mainCardsDisplay } from '../../clientUtils/clientUtils';
import { Redirect } from "react-router-dom";

const TVShows = ({ data, error, isLoading, watchList, setWatchList, setMovieDetails, setMovieToPlay, favoritesList, setFavoritesList }) => {
    const [isRedirect, setIsRedirect] = useState(false);
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    const elements = mainCardsDisplay("series", data, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer);

    return (
        <div className="cardsContainer">
            <div className="cards">{isLoading ? <Spinner /> : elements} </div>
            {error ? <p style={{ color: "red" }} > error</p> : ""}
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default TVShows;

