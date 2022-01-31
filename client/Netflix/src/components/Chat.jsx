import React, { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase';
import SendMessage from './SendMessage';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    // const [scroll] = useRef()

    useEffect(() => {
        db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapShot =>
            setMessages(snapShot.docs.map(doc => doc.data()))
        )
    }, []);

    const elements = messages.map(({ id, uid, text, photoURL }) =>
        // < div >
        <div key={id} className={`message ${uid == auth.currentUser.uid ? 'sent' : 'received'}`}>
            <img src={photoURL} alt="" />
            <h4>{text}</h4>
        </div>)
    // </div >)

    return <>
        <div className='messages'>
            {elements}
        </div>
        <SendMessage />
        {/* <SendMessage scroll={scroll} /> */}
        {/* <div ref={scroll}></div> */}
    </>;
}
















export default Chat;
