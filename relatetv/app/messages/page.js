'use client'
import { useState, useEffect} from 'react'
import './page.css'
import {useSession} from 'next-auth/react'
import girl from '../assets/girl1.jpg'
import girl2 from '../assets/girl3.jpg'
import guy from '../assets/guy.jpg'
import Image from 'next/image'
import Link from 'next/link'
import {formatDistance} from 'date-fns'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Inbox = () => {

  const {data:session} = useSession()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const newMsg = JSON.stringify(messages)
  console.log(JSON.parse(newMsg))

    useEffect(() => {
      const getMsges = async()=>{
        setLoading(true)
        const res = await fetch(`api/chats/${session?.user?.id}`,{
          cache: "no-store"
        })
        const data = await res.json()
        setMessages(data)
        setLoading(false)
      }
    
      getMsges()
    }, [newMsg])

    
  return (
    <div className='inboxContainer'>
      
      {(JSON.parse(newMsg).length > 0) ? (JSON.parse(newMsg).map(ms=>(
        <Link key={ms.id} href={`/inbox/${ms?._id}`}>
        <div className='messanger' >
          <Image src={ms?.postImg} width={100} height={100} alt='img'/>
          <div className='message'>
            
            <p>{(ms?.chat?.filter(u => u.username !== session?.user?.username)[0].username)}</p>

            <span className='p2'>{ms?.chat?.slice(-1)[0]?.message}</span>
          </div>
          <span className='time'>{ms?.chat?.createdAt ? formatDistance(new Date(ms?.chat?.slice(-1)[0]?.createdAt), new Date()) : null} ago</span>
          </div>
          </Link>
      ))):(<p>No messages...</p>)}
    </div>
  )
}

export default Inbox