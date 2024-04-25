"use client"
import { useState } from 'react';
import io from 'socket.io-client';
import { VscSend } from 'react-icons/vsc';

const Chat = ({chatId, senderId, username}) => {
   
    // State to store the messages
    const [message, setMessage] = useState('')
    const socket = io.connect('http://localhost:4000');
    // State to store the current message
    const handleSubmit = (e) => {
       
        e.preventDefault()
        // Send the message to the server
        console.log(chatId, username, senderId, message)
        if(!chatId && !username && !senderId && message == ''){
            return
        }else{
            socket.emit('private message', chatId, username, senderId, message);
            setMessage('')
        }
        
        // Clear the currentMessage state
        
    };

    return (
        <div className='create-msg'>
        <form onSubmit={handleSubmit}>
          <input 
            placeholder='Message'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            />
            <div  className='font'>

          <button><VscSend  /></button>
            </div>
        </form>
       </div>
    );
};

export default Chat;