'use client'
import React from 'react'
import { useState } from 'react'
import './page.css'
import logo from '../assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CiDatabase } from 'react-icons/ci'
const Request = () => {
  const {data:session} = useSession()
  console.log(session)
  const [postBody, setPostBody] = useState('')
  const [amount, setAmount] = useState('Negotiable')
  const [duration, setDuration] = useState('')
  const [location, setLocation] = useState(session?.user?.address)
  const [msg, setMsg]=useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!postBody){
      setMsg(`Please fill the what do you want field`)
      return
    }
    setLoading(true)
    setMsg('...Requesting')
    const res = await fetch('/api/posts',{
      method:"POST",
      body:JSON.stringify({
        postBody,
        amount,
        duration,
        location,
        image:session?.user?.img,
        postOwner:session?.user?.id,
        username:session?.user?.username
      }),
      headers:{
        "Content-type":"application/json"
      }
    })
  
    if(!res.ok){
      setMsg('Somthing went wrong, try again')
      setLoading(false)
    }else{
      setMsg(`Request sent and waiting approval`)
      setLoading(false)
      setPostBody('')
      setLocation('')
      setDuration('')
    }

  }

  return (
    <div className='form'>
      
      <form onSubmit={handleSubmit}>
      <Image src={logo} width={50} height={50} alt='img' />
        <textarea
         type="text"
         placeholder='What do you want'
         value={postBody}
         onChange={(e)=>setPostBody(e.target.value)}
         ></textarea>
         <input
         placeholder='Amount'
         value={amount}
         onChange={(e)=>setAmount(e.target.value)}
         />
         <input 
         value={location}
         onChange={(e)=>setLocation(e.target.value)}
         placeholder='Location'
         />
        <input 
        placeholder='duration'
        value={duration}
        onChange={(e)=>setDuration(e.target.value)}
        />
        
        <button disabled={!session}>{session ? ('Submit'): ('Please Login')? setLoading : ('...Loading') }</button>
        {msg && <>
        <span style={{fontSize:"14px"}}>{msg }</span> 
        <Link style={{textDecoration:'underline', fontSize:"15px", color: 'lightseagreen'}}  href={'/'}>Go Home</Link>
        </> 
        }
      </form>
      
    </div>
  )
}

export default Request