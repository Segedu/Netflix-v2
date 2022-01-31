import { useState } from "react";
import { addToList, removeFromList, showObjDetails, playVideo } from '../../clientUtils/clientUtils';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";
import { Redirect } from "react-router-dom";
import { API_KEY_MOVIES } from "../../../logic/key";
import styles from './Home.module.css';
import axios from "axios";

const Home = ({ data, watchList, setWatchList, setMovieDetails, setMovieToPlay, favoritesList, setFavoritesList }) => {
    const [searchResults, setSearchResults] = useState([])
    const [isRedirect, setIsRedirect] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [isRedirectToVideoPlayer, setIsRedirectToVideoPlayer] = useState(false);

    function getMovies(searchTerm) {
        const url = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY_MOVIES}`;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                if (response.data.Search) {
                    setSearchResults(response.data.Search);
                }
            }).catch(error => {
                console.log(error);
            })
    }

    const Elements = data.map(display =>
        <section key={display.id}>
            <img src={display.posterUrl} alt={display.title} onClick={() => {
                showObjDetails(display.id, data, setMovieDetails, setIsRedirect)
            }} />
            <article className="details">
                <h4>{display.title}</h4>
                {/* <p>{display.actors}</p> */}
                <h4>{display.year}</h4>
                <article className="buttonsCont">
                    <button onClick={() => playVideo(data, display.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(data, display.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle fontSize="xx-large" color="white" /></button>
                    <button onClick={() => removeFromList(display.id, watchList, setWatchList, "watchList")}><HiOutlineMinusCircle fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(data, display.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                </article>
            </article>
        </section>
    )


    const searchInputHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
    }

    const searchResultsElements = searchResults.map((movie) =>
        <section key={movie.imdbID}>
            <img src={movie.Poster} />
            <article className="details">
                <h4>{movie.Title}</h4>
                <article className="buttonsCont">
                    <button onClick={() => playVideo(movie.video, setMovieToPlay, data, setIsRedirectToVideoPlayer)}><BsPlayCircle fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(data, movie.id, watchList, setWatchList, "watchList")}> <HiOutlinePlusCircle title="Add to watch list" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => removeFromList(movie.id, watchList, setWatchList, "watchList")}> <HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(data, movie.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                </article>
            </article>
        </section>
    )

    const watchListElements = watchList.map(watchListObj =>
        <section key={watchListObj.id}>
            <img src={watchListObj.posterUrl} alt={watchListObj.title} />
            <article className="details">
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
            <article className="details">
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
            <div className="searchNav">
                <input onChange={(e) => searchInputHandler(e.target.value)} value={searchTerm} className={styles.searchInput} type="text" inputMode="search" placeholder="Type movie / Tv series..." autoComplete="true" />
                <button onClick={() => getMovies(searchTerm)} className={styles.searchBtn}>Search</button>
            </div>
            <div className="HomePageTrailer"><iframe width="1366" height="625" src="https://www.youtube-nocookie.com/embed/GV3HUDMQ-F8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
            <h3>Movies & TV Shows</h3>
            <div className="cards" >{searchTerm ? searchResultsElements : Elements}</div>
            <h3>Your Watch List</h3>
            <div className="watchListCards">{watchListElements}</div>
            <h3>Your Favorites</h3>
            <div className="favoritesCards"> {favoritesElements}</div>
            {isRedirect ? <Redirect to="/Details" /> : ""}
            {isRedirectToVideoPlayer ? <Redirect to="/VideoPlayer" /> : ""}
        </div >
    )
}

export default Home;

