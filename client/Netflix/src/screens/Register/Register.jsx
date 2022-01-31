import { useState } from "react";
import axios from "axios";
import { API_KEY } from '../../../logic/key.js';
import Spinner from "../../components/Spinner/Spinner.jsx";
import style from '../LogIn/LogIn.module.css';

const Register = ({ setAuth }) => {
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState()
    const [errorFromServer, setErrorFromServer] = useState(false);
    const [loading, setLoading] = useState(false);

    function register() {
        setLoading(true)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
        axios
            .post(url, {
                email: userEmail,
                password: password,
            })
            .then(function (response) {
                setLoading(false)
                setAuth(response.data);
            })
            .catch(function (error) {
                setErrorFromServer(error.message)
            });
    }

    const emailValidation = (e) => {
        setUserEmail(e.target.value)
    }

    const passwordValidation = (e, setFunction) => {
        if (e.target.value.length > 7 && e.target.value !== ""
            && e.target.value != 0 && e.target.value !== null) {
            setFunction(e.target.value);
        }
    }

    return (
        <div className="Form">
            <section>{loading ? <Spinner /> : ""}</section>
            <form onSubmit={(e) => {
                e.preventDefault();
                if (password === confirmPassword) {
                    register()
                } else {
                    alert("incorrect password")
                }
            }}>
                <h1>Register</h1>
                <input type="email" onChange={(e) => { emailValidation(e) }} placeholder="Enter Email" /><br></br>
                <input type="password" onChange={(e) => { passwordValidation(e, setPassword) }} placeholder="Enter Password" /><br></br>
                <input type="password" onChange={(e) => { passwordValidation(e, setConfirmPassword) }} placeholder="Confirm Password" />
                <input type="submit" value="Register" />
            </form>
            <h3>{errorFromServer ? "Error from server during Registration" : ""}</h3>
        </div>
    )
}

export default Register;