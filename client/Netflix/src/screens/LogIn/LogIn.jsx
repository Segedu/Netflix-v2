import axios from "axios";
import { useState } from "react";
import { API_KEY } from '../../../logic/key';
import Spinner from '../../components/Spinner/Spinner'
import styles from './LogIn.module.css';
import React from 'react';
import firebase from 'firebase';
import { auth } from '../../firebase';

const LogIn = ({ setAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorFromServer, setErrorFromServer] = useState(false);
    const [loading, setLoading] = useState(false);
    const LOCAL_STORAGE_AUTH_KEY = "auth";

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
        setAuth(auth.currentUser.email)
    }

    const login = () => {
        setLoading(true)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        axios
            .post(url, {
                email,
                password,
            })
            .then(function (response) {
                setLoading(false)
                setAuth(response.data.email)
                localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error)
                setErrorFromServer(error)
            });
    }

    return (
        <div className="Form">
            <section>{loading ? <Spinner /> : ""}</section>
            <form onSubmit={(e) => {
                e.preventDefault(),
                    login()
            }} >
                <h1>Login</h1>
                <input className={styles.input} type="email" placeholder="Enter Your Email" onChange={(e) => { setEmail(e.target.value) }} /><br></br>
                <input className={styles.input} type="password" placeholder="Enter Your Password" onChange={(e) => { setPassword(e.target.value) }} /><br></br>
                <input className={styles.button} type="submit" value="Login" />
                <button onClick={signInWithGoogle}>Sign-In with Google</button>
            </form>
            <h3>{errorFromServer ? "Error from server during Login" : ""}</h3>
        </div >)
}

export default LogIn;