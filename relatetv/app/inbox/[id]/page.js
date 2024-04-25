'use client'
import {useState, useEffect, useRef } from 'react'
import './page.css'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import {formatDistance} from 'date-fns'
import { useRouter, usePathname } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Chat from '@/app/chat/page'
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom'
import Location from '@/app/location/page'

 const Message = () => {
  const socket = io.connect('http://localhost:4000');
  const {data:session} = useSession()
  const router = useRouter()

  
  // States

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [otherUser, setOtherUser] = useState([])
  const [chats, setChats] = useState([])


  // Instatnces
  const chatId = usePathname()?.slice(7)
  const user1 = messages?.chat?.members?.userId
  const user2 = messages?.chat?.members?.postOwner
  const arr = [user1, user2]
  const bottomRef = useRef();
    let users = arr.filter(i => i !== session?.user?.id)
  
    let newUser = JSON.stringify(users).slice(2, 26)
  
    
  socket.on('receive message',(username, chatId, senderId, message) => 
  setChats([username, chatId, senderId, message])
  )
 
  const stringifiedMsg = JSON.stringify(chats)
  
  // Useeffect
  
    useEffect(() => {
      setLoading(true)
      const getMsges = async()=>{
        const res = await fetch(`http://localhost:3000/api/chat/${chatId}`,{
          cache: "no-store"
        })
        const data = await res.json()
        setMessages(data)
        setLoading(false)
      }
      getMsges()

    
      if(newUser){
        async function getUser(){
            const user = newUser
            const res = await fetch(`http://localhost:3000/api/user/${user}`,{
              cache: "no-store"
            })
            const data = await res.json()
            setOtherUser(data)
        }
        getUser() 
          }
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
          
    }, [newUser, stringifiedMsg])
    const getLocation = ()=>{
      alert('Are u sure')
    }

  return (
    <div className='messages'>
        <div className='header'>
          
        {<Image src={messages?.chat?.postImg} alt="img" width={100} height={100} /> || <Skeleton/>}
         <p className='chat-username'>{otherUser?.otherUser?.username}</p>
        </div>
       
        <div className='gridContain'>

          {(messages?.chat?.chat?.map(msg=>(
            <div key={msg?._id} className={` message ${(session && session?.user?.username === msg?.username)? "me" : "otherUser"} `}>
              <>
              <p>{msg?.message}</p>
            <span>{msg.createdAt ? formatDistance(new Date(msg.createdAt), new Date()) : null} ago</span>
              </>
            </div>
            
            )))}
             
             </div>
             <div id="bottom-reference" ref={bottomRef} />
           <Location />
             <Chat chatId={chatId} username={session?.user?.username} senderId={session?.user?.id} />
    </div>
  )
}
export default Message
