import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { db } from "../../firebase";
import { doc, onSnapshot } from 'firebase/firestore';
import { ChatContext } from '../../contexts/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!currentUser) {
      console.error('No currentUser found');
      return;
    }

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) {
          setChats(doc.data());
        } else {
          console.error('No data found for this user');
        }
      });

      return () => {
        unsub();
      };
    };

    getChats();
  }, [currentUser]);

  if (!currentUser) {
    return <div className="chats">Loading...</div>;
  }

  const handleSelect = (u) =>{
    dispatch({type:"CHANGE_USER", payload: u});
  };

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
