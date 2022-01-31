import { Fragment } from "react";

const Logout = ({ setAuth }) => {

    setTimeout(() => {
        localStorage.removeItem("auth");
    }, 1200000)

    return (<Fragment>
        <button className="LogOutBtn" onClick={() => {
            setAuth(null)
            localStorage.removeItem("auth");
        }}>Logout</button>
    </Fragment >)
}

export default Logout;


// import React from 'react';
// import { auth } from '../firebase';

// function SignOut({ setUser }) {
//     return <div>
//         <button onClick={() => {
//             auth.signOut(),
//                 setUser(null)
//         }
//         }>SignOut</button>
//     </div>;
// }

// export default SignOut;
