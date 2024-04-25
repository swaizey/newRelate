'use client'

import {signOut} from 'next-auth/react'
import {useSession} from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import './components.css'
import Image from 'next/image'
import logo from '../assets/logo.png'

const Navbar = () => {
  const {data:session} = useSession()
  
  return (
    <nav className='nav flex justify-between items-center '>
        <Link href={'/'}><Image src={logo} width={30} height={30} alt='img' /></Link>
        <div className='navLinks '>

        <div style={{marginRight: '9px', color:'black', display:"flex", justifyContent:"space-between", alignItems:"center" }} >
          
          {session ? (<Link href={'/profile'}>{`Hi, ${session.user.username.toUpperCase()}`} </Link>):(<button>Relate User</button>)}
        
       

        {session ? (<Link href={'/profile'}><Image className='nav-img' src={session?.user?.img} width={100} height={100} /> </Link>):
            (<Link className='loginBtn' style={{marginLeft:"10px"}}  href={'/login'}>Login</Link>)
        }
         </div>
        
        </div>
        
    </nav>
  )
}

export default Navbar