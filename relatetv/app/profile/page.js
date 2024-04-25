'use client'
import React from 'react'
import img from '../assets/girl1.jpg'
import Image from 'next/image'
import {useSession} from 'next-auth/react'
import './page.css'
import {signOut} from 'next-auth/react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { redirect } from 'next/navigation'

const Page = () => {
  const {data:session} = useSession()
  console.log(session)

  if(!session) redirect('/')
  return (
    <div className='profile'>
    
      <div className='imgCont' style={{backgroundImage:`url(${session?.user?.img})`, backgroundRepeat:"no-repeat",backgroundSize:"cover" }}>
        {<div className='blur'></div> ||<Skeleton /> }
        {<Image className='img'  src={session?.user?.img} alt='img' width={100} height={100} /> || <Skeleton />}
      </div>
      
      <div className='info'>
        <p>Info</p>
      
         {<div className='profileInfo-contain'>

            <div className='profile-flex'>
              <div>
              <p>Username</p>
              <p className='title'> {session?.user?.username}</p>
              </div>

              <div>
              <p >First Name</p>
              <p className='title'> {session?.user?.name}</p>
              </div>
            </div>

            <div className='profile-flex'>
              <div>
              <p>Address</p>
              <p className='title'> {session?.user?.address}</p>
              </div>

              <div>
              <p >Last Name</p>
              <p className='title'> {session?.user?.lastname}</p>
              </div>
            </div>

            <div className='profile-flex'>
              <div>
              <p>Phone</p>
              <p className='title'> {session?.user?.phone}</p>
              </div>

              <div>
              <p >Mail</p>
              <p className='title'> {session?.user?.mail}</p>
              </div>
            </div>

            <div className='profile-flex'>
              <div>
              <p>{session?.user?.gender == 'male'? 'SPEC' : 'Body Type'}</p>
              <p className='spec'>{session?.user?.spec.map(sp=>(<li>{sp}</li>))}</p>
              </div>

              <div>
              <p>Likes</p>
              <p>{session?.user?.like.length}</p>
              </div>
            </div>

          </div> || <Skeleton />}

        </div>
        {session && (<button onClick={()=>signOut()} className='loginBtn' style={{marginLeft:"10px"}}>Sign out</button>)}
    </div>
  )
}

export default Page