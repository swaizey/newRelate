'use client'

import React, { useState, useEffect } from 'react';
import {CiSearch} from 'react-icons/ci'
import {MdChat} from 'react-icons/md'
import Image from 'next/image'
import {formatDistance} from 'date-fns'
import Slider from './slider'
import Modal from './Modal';
import { useSession } from 'next-auth/react';
import logo from '../assets/logo.png'

const Requests= () => {
  const [posts, setPosts] = useState([])
  const [close, setClose] = useState(false)
  const {data:session} = useSession()
  console.log(session)
  useEffect(() => {
    const getPost = async()=>{
      const res = await fetch('http://localhost:3000/api/posts',{
        cache: "no-store"
      })
        const data = await res.json()
        setPosts(data)
    }
    getPost()
  
  }, [])
 


// Modall @@@@@@@@@@@@@@@

  return (
    
    <div className='requestPage'>
      <Slider />
    
      <div className='searchUser flex justify-between items-center'>
        <input placeholder='Search by username'/>
        <CiSearch />
      </div>
      <div className='requests'>
        {console.log(posts)}
      
        {( posts?.posts?.length > 0) ? (posts?.posts?.map(p=>(
          <div key={p._id}>
          <Modal 
          close={close} 
          setClose={setClose}
          postOwner={p?.postOwner}
          postPic={p?.image}
          username={p?.username}
          />

          <div className='userCard' >
            <div className='flex'>
              {console.log(p.image)}
              {p?.image=== undefined ? <img src={logo} /> : <Image className='requestPic' src={p?.image} width={100} height={100} alt='img'/>}
                <div className='userdetails'>
                  <p>username: {p?.username}</p>
                  <p>location: {p?.location}</p>
                  <p>request: {p?.postBody?.slice(0, 45)}</p>
                  <p>amount: {p?.amount}</p>
                  <p>duration: {p?.duration}</p>
                  <p>{formatDistance(new Date(p?.updatedAt), new Date())} ago</p>
                  <div className='likes flex'>
                  {/* <span><FaRegThumbsUp/>{p.likes}</span> */}
                 
                  </div>
                  </div>
              </div>
              
            </div>

            {session?.user?.username !== p?.username &&
            <button onClick={()=> setClose(!close)} id={p?.postOwner} className='chatBtn'>Chat With User <MdChat  style={{display:'inline'}}/></button>}
           
            </div>
        
        ))):(<p style={{color:'black'}}>No post at this time.... YOU CAN RELOAD YOUR BROWSER</p>)}
      </div>
    </div>
  )
}

export default Requests