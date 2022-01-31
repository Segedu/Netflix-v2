import { HiOutlinePlusCircle, HiOutlineMinusCircle } from "react-icons/hi";
import { BsHandThumbsUp, BsPlayCircle } from "react-icons/bs";

export function mainCardsDisplay(cardsCategory, data, showObjDetails, setMovieDetails, setIsRedirect, watchList, setWatchList, favoritesList, setFavoritesList, setMovieToPlay, setIsRedirectToVideoPlayer) {
    const elements = data.filter(movieType => movieType.type == cardsCategory).map(movie =>
        <section key={movie.id}>
            <img src={movie.posterUrl} alt={movie.title} />
            <article className="details" onClick={() => {
                showObjDetails(movie.id, data, setMovieDetails, setIsRedirect);
            }}>
                <h2>{movie.title}</h2>
                <p>{movie.actors}</p>
                <h3>{movie.year}</h3>
                <article className="buttonsCont">
                    <button onClick={() => playVideo(data, movie.video, setMovieToPlay, setIsRedirectToVideoPlayer)}><BsPlayCircle title="play video" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(data, movie.id, watchList, setWatchList, "watchList")}><HiOutlinePlusCircle title="Add to watch list" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => removeFromList(movie.id, watchList, setWatchList, "watchList")}><HiOutlineMinusCircle title="Remove from watch list" fontSize="xx-large" color="white" /></button>
                    <button onClick={() => addToList(data, movie.id, favoritesList, setFavoritesList, "favoritesList")}><BsHandThumbsUp title="Like" fontSize="xx-large" color="white" /></button>
                </article>
            </article>
        </section >
    )
    return elements;
}

export function addToList(dataArray, objId, category, setFunction, listKeyName) {
    const filtered = dataArray.filter(obj => obj.id == objId);
    const foundObj = filtered.find(obj => obj.id == objId);
    if (category.indexOf(foundObj) > -1) {
        alert(`already in your ${listKeyName}`)
    }
    else {
        const updatedArray = [foundObj, ...category];
        setFunction(updatedArray);
        localStorage.setItem(listKeyName, JSON.stringify(updatedArray));
    }
}

export const removeFromList = (objId, category, setFunction, listKeyName) => {
    const updatedArrayAfterRemove = [...category].filter(obj => obj.id !== objId);
    setFunction(updatedArrayAfterRemove);
    localStorage.setItem(listKeyName, JSON.stringify(updatedArrayAfterRemove));
    return updatedArrayAfterRemove
}

export const showObjDetails = (objId, dataArray, setFunction, setIsRedirect) => {
    const foundObj = dataArray.find(obj => obj.id === objId);
    setFunction(foundObj);
    setIsRedirect(true);
}

export function searchData(input, dataArray, setArray, setInput) {
    if (input) {
        const search_result = dataArray.filter(element => {
            const regex = new RegExp(`${input}`, "gi");
            return (element.title.match(regex))
        })
        setArray(search_result)
        setInput(input)
    }
}

export function playVideo(dataArray, videoUrl, setClickedObj, setRedirect) {
    const foundObj = dataArray.find(obj => obj.video === videoUrl);
    setClickedObj(foundObj);
    setRedirect(true);
}
export const suggestionHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    setSuggestions([]);
}

//! additional data
// searchData(searchTerm, data, setSuggestions, setSearchTerm); //!searchInputHandler function
{/* <button onClick={() => searchData(searchTerm, data, setSuggestions, setSearchTerm)} className={styles.searchBtn}>Search</button> */ }//!ui search btn
