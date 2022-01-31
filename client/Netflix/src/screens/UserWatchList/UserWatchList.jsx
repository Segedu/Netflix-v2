import { useState } from "react";
import { removeFromList, addToList, playVideo } from "../../clientUtils/clientUtils";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { Redirect } from "react-router-dom";

const UserWatchList = ({ data, watchList, setWatchList, setMovieToPlay, favoritesList, setFavoritesList }) => {
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    const watchListElements = watchList.map(watchListObj =>
        <section key={watchListObj.id}>
            <img src={watchListObj.posterUrl} alt={watchListObj.title} />
            <article className="displayCont">
                <h4>{watchListObj.title}</h4>
                {/* <p>{watchListObj.actors}</p> */}
                <h4>{watchListObj.year}</h4>
                <article className="buttonsCont">
                    <button onClick={() => playVideo(data, watchListObj.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(data, watchListObj.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => removeFromList(watchListObj.id, watchList, setWatchList, "watchList")}><HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
                </article>
            </article>
        </section>
    )

    const favoritesElements = favoritesList.map(likedItem =>
        <section key={likedItem.id}>
            <img src={likedItem.posterUrl} alt={likedItem.title} />
            <article className="displayCont">
                <h4>{likedItem.title}</h4>
                {/* <p>{likedItem.actors}</p> */}
                <p>{likedItem.year}</p>
                <article className="buttonsCont">
                    <button onClick={() => addToList(data, likedItem.id, watchList, setWatchList, "watchList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => removeFromList(likedItem.id, favoritesList, setFavoritesList, "favoritesList")}><HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
                </article>
            </article>
        </section>
    )

    return (
        <div className="cardsContainer">
            <h1>Watch List</h1>
            <div className="watchListCards"> {watchListElements}</div>
            <h1>Favorites</h1>
            <div className="favoritesCards"> {favoritesElements}</div>
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div>
    )
}

export default UserWatchList;

