'use client'

import {CiHome} from 'react-icons/ci'
import { MdPostAdd, MdOutlineRateReview, MdOutlineAdminPanelSettings } from 'react-icons/md'
import {HiMiniInboxArrowDown} from 'react-icons/hi2'
import './components.css'
import {useSession} from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const {data:session} = useSession()
  const pathname = usePathname()

  
  return (
    <div className=' footer flex justify-between itmems-center'>
        <div  className={ `icon ${pathname == '/'?"active" : null}`} >
           <Link href={'/'}><CiHome /></Link> 
        <p>Home</p>
        </div>

        <div className={ `icon ${pathname == '/request'?"active" : null}`}>
        <Link href='/request'> <MdPostAdd /></Link> 
           
        <p>Request</p>
        </div>
        <div className={ `icon ${pathname == '/feedback'?"active" : null}`}>
        <Link href={'/feedback'}><MdOutlineRateReview /></Link> 
            
        <p>Feed back</p>
        </div>
        <div className={ `icon ${pathname == '/messages'?"active" : null}`}>
        <Link href={'/messages'}><HiMiniInboxArrowDown /></Link> 
            
        <p>Messages</p>
        </div>
        {session?.user?.isAdmin && 
        <div className={ `icon ${pathname == '/admin'?"active" : null}`}>
          <Link href='/admin'>
          <MdOutlineAdminPanelSettings />
          </Link>
          <p>Admin Panel</p>
        </div>
          }   
    </div>
  )
}

export default Footer