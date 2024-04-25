'use client'
import React from 'react'
import './pages.css'
import { useState } from 'react'
//import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


const GenderSelect = () => {
  const router = useRouter()
  const [gender, setGender] = useState('')
 

  const genderSet =(e)=>{
    e.preventDefault()
    if(gender == 'male' || gender == 'female'){
      router.push(`/${gender}`)
    }else{
      alert('Please select your gender')
      return
    }
    
    
  }
  return (
    <div className='formGender'>
        <p>Select your gender</p>
        <div className='genderBtn'>
          
        <form onSubmit={genderSet}>
          <select 
          onChange={(e)=>setGender(e.target.value)}>
            <option>Select your gender</option>
            <option>male</option>
            <option>female</option>
          </select>
            <button>Submit</button>
        </form>
        </div>
       <p>Already have an account? <Link href='login'>Login</Link></p>
    </div>
  )
}

export default GenderSelect