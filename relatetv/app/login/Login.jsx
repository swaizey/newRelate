'use client'

import Link from 'next/link'
import React from 'react'
import './page.css'
import Image from 'next/image'
import { useState } from 'react'
import logo from '../assets/logo.png'
import {signIn} from 'next-auth/react' 
import { useRouter } from 'next/navigation'

const Login = () => {
  const [usernameEmail, setUsernameEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setIsloading] = useState(false)
  
  const router = useRouter()

  const handleLogin = async(e)=>{
    e.preventDefault()
    setIsloading(true)
    try{
      const res = await signIn('credentials', {
        usernameEmail:usernameEmail.toLowerCase(),
        password,
        redirect:false
      })
      
      if(res.error){
        setError("Invalid Credentials")
        setIsloading(false)
        console.log(res.error)
        return
      }
      router.push('/')
      setIsloading(false)
    }catch(error){
      console.log(error)
      setIsloading(false)
    }
  }

  return (
    <div className='login'>
        <form onSubmit={handleLogin}>
        <Image src={logo} alt='img' />
            <input
                placeholder='username or email'
                value={usernameEmail}
                onChange={(e)=> setUsernameEmail(e.target.value)}
                />
            <input 
                placeholder='Password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                <button disabled={loading} style={{background:loading? 'red':"#048dd5"}}>
                  {loading ? 'Loading...' : "Submit"}
                </button>
        </form>
        <p>Dont have an account? <Link href='register'>Register</Link></p>
        {error && <p>{error}</p>}
    </div>
  )
}

export default Login