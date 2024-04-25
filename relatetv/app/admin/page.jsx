'use client'
import { useState } from 'react'
import './adminpage.css'
import Users from './Users'
import Posts from './Posts'
import Feedbacks from './Feedbacks'
import Chats from './Chats'
import Update from './Update'
import { usePathname } from 'next/navigation'


const Page = () => {
    const [reqType, setReqType] = useState('users')
    const pathname = usePathname()
    console.log(pathname)
  
    let renderedPage
    if(reqType === 'feedbacks'){
        renderedPage = <Feedbacks reqType={reqType}  />
    }else if(reqType === 'posts'){
        renderedPage = <Posts reqType={reqType}  />
    }else if(reqType === 'users'){
        renderedPage = <Users reqType={reqType} />
    }else if(reqType === 'update'){
       renderedPage = <Update reqType={reqType} />
    }else if(reqType === 'chat'){
       renderedPage = <Chats reqType={reqType} />
    }

    const form = (
        <div className='header'>
            <button className={ `${reqType == 'users'?"bounce-top" : null}`} onClick={()=>setReqType('users')}>users</button>
            <button className={ `${reqType == 'posts'?"bounce-top" : null}`} onClick={()=>setReqType('posts')}>posts</button>
            <button className={ `${reqType == 'feedbacks'?"bounce-top" : null}`} onClick={()=>setReqType('feedbacks')}>feedbacks</button>
            <button className={ `${reqType == 'update'?"bounce-top" : null}`} onClick={()=>setReqType('update')}>Create Update</button>
            <button className={ `${reqType == 'chat'?"bounce-top" : null}`} onClick={()=>setReqType('chat')}>Chats</button>

        </div>
    )

  return (  
    <div className='admin-main'>
        {form}
        {renderedPage}
    </div>

  )
}

export default Page