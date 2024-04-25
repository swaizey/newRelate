import React from 'react'
import Image from 'next/image'
import {formatDistance} from 'date-fns'
import guyImg from '../assets/guy.jpg'
import babeImg from '../assets/thickbabe.jpg'
import Link from 'next/link'


const feed = async()=>{
    try {
      const res = await fetch('http://localhost:3000/api/feedbacks',{
        cache:"no-store"
      })
      if(!res.ok){
        return res.json('Faile to get Posts')    
      }
      return res.json()
    } catch (error) {
      return res.json(error)
    }  
  }

  
  const {feedbacks} = await feed()
  const Feedpics = feedbacks?.map(feed=>feed?.gender)
  let pic
  if(Feedpics === "male"){
    pic = guyImg
  }else if(Feedpics === "female"){
    pic = babeImg
  }
  const GetFeedBacks = async() => {
  return (
    <div >
  
      <div className='feedbacks'>
    {feedbacks?.map(feedback=>(
      <div key={feedback._id} className='feedbackContainer'>
        <div className='imgContainer'>
        
        { feedback?.image === "" ? <Image className='img' src={pic} alt='img' width={50} height={50}/> : <Image className='img' src={feedback?.image} alt='img' width={50} height={50}/> }
        
        </div>
          <div className='feedBack'>
              <p className='p1'>{feedback?.username}</p>
              <p className='p2'>{feedback?.feedback}</p>
              <p style={{color:'lightgrey', fontSize:'10px', marginBottom:'8px'}}>{formatDistance(new Date(feedback?.updatedAt), new Date())}</p>
            </div>
        </div>
    ))}
    </div>
    
    </div>
  )
}

export default GetFeedBacks
