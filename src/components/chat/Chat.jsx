import React, { useContext, useState }from 'react';
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../../contexts/ChatContext';

const Chat = () => {


  const { data } = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatInfo" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: 'white'}}>
        <span style={{ fontSize: '2em', textAlign: 'center' }}>{data.user?.displayName}</span>
      </div>

      <Messages />
      <Input/>
    </div>
  )
}

export default Chat
