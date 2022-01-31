import React, { useState } from 'react';
import { db, auth } from '../firebase';
import firebase from 'firebase';


function SendMessage() {
    const [message, setMessage] = useState('');

    async function sendMessage(e) {
        e.preventDefault();
        const { uid, photoURL } = auth.currentUser;
        await db.collection('messages').add({
            text: message,
            photoURL,
            uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setMessage('');
        // scroll.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (<div>
        <div className="sendMessage">
            <input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder='Message...' />
            <button onClick={(e) => { sendMessage(e) }}>Send</button>
        </div>
    </div >
    )

}

export default SendMessage;
