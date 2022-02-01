import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from './hooks/useFetch';
import Home from './screens/Home/Home';
import Logout from './components/LogOut';
import Login from './screens/LogIn/LogIn';
import Register from './screens/Register/Register';
import UserWatchList from './screens/UserWatchList/UserWatchList';
import Movies from './screens/Movies/Movies';
import TVShows from './screens/TVShows/TVShows';
import Details from './screens/Details/Details';
import VideoPlayer from './screens/VideoPlayer/VideoPlayer';
import netflixLogo from './video/netflix.png.png'
import Chat from './components/Chat';
import { getData } from './clientUtils/clientDataUtils';
import './App.css';

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null);
  const [data, setData] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [movieDetails, setMovieDetails] = useState("");
  const [favoritesList, setFavoritesList] = useState([]);
  const [movieToPlay, setMovieToPlay] = useState("");

  useEffect(() => {
    getData('movies', setData)
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          {auth ? (
            <>
              <Redirect to="UserWatchList" />
              <Link to="/"><img src={netflixLogo} alt="" /></Link>
              <Link to="/UserWatchList">My Watch List <p className='watchListCounter'>{watchList.length ? watchList.length : ""}</p></Link>
              <Link to="/Movies">Movies</Link>
              <Link to="/TVShows">TV Shows</Link>
              <Link to="/Chat">Chat</Link>
              <Logout setAuth={setAuth} />
            </>
          ) : <Redirect to="/" />}
          {!auth ? (
            <>
              <Link to="/"><img src={netflixLogo} alt="" /></Link>
              <Link to="/Movies">Movies</Link>
              <Link to="/TVShows">TV Shows</Link>
              <Link to="/LogIn">Login</Link>
              <Link to="/Register">Register</Link>
              <Redirect to="/" />
            </>
          ) : <Redirect to="/" />}
        </nav>
        <Switch>
          <Route exact path="/" component={() => <Home setMovieToPlay={setMovieToPlay} favoritesList={favoritesList} setFavoritesList={setFavoritesList} setMovieDetails={setMovieDetails} data={data} watchList={watchList} setWatchList={setWatchList} />} />
          <Route exact path="/Login" component={() => <Login setAuth={setAuth} />} />
          <Route exact path="/Register" component={() => <Register setAuth={setAuth} />} />
          <Route exact path="/Movies" component={() => <Movies setMovieToPlay={setMovieToPlay} favoritesList={favoritesList} setFavoritesList={setFavoritesList} setMovieDetails={setMovieDetails} watchList={watchList} setWatchList={setWatchList} data={data} />} />
          <Route exact path="/TVShows" component={() => <TVShows setMovieToPlay={setMovieToPlay} setMovieDetails={setMovieDetails} watchList={watchList} setWatchList={setWatchList} favoritesList={favoritesList} setFavoritesList={setFavoritesList} data={data} />} />
          <Route exact path="/UserWatchList" component={() => <UserWatchList setMovieToPlay={setMovieToPlay} data={data} watchList={watchList} setWatchList={setWatchList} favoritesList={favoritesList} setFavoritesList={setFavoritesList} />} />
          <Route exact path="/Details" component={() => <Details setMovieToPlay={setMovieToPlay} data={data} watchList={watchList} setWatchList={setWatchList} movieDetails={movieDetails} setMovieDetails={setMovieDetails} />} />
          <Route exact path="/VideoPlayer" component={() => <VideoPlayer movieToPlay={movieToPlay} />} />
          <Route exact path="/Chat" component={() => <Chat setAuth={setAuth} />} />
        </Switch>
      </div>
    </BrowserRouter >
  )
}

export default App;
