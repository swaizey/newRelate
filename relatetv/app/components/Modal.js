'use client'
import Image from 'next/image';
import {useState} from 'react'
import { FiSend } from "react-icons/fi";
import logo from '../assets/logo.png'
import { IoMdClose } from "react-icons/io";
import {useSession} from 'next-auth/react'


const Modal = ({close, setClose, postOwner, postPic, username }) => {

    const {data:session} = useSession()
    const [msg, setMsg] = useState('')
    console.log(session)
    
    console.log(session?.user?.id, username)
    const submitMsg = async(e)=>{
        e.preventDefault()
        if(msg === ''){
            console.log('Please type a message')
            setClose(false)
        }else if(!postOwner){
            setClose(false)
            cosole.log('no post owner')
            return
        }else if(session?.user?.id ===postOwner ){
            setClose(false)
            console.log('you cant message yourself')
            return
        }

        const res = await fetch(`api/chats/${session?.user?.id}/${postOwner}`,{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                userId:session?.user?.id,
                postOwner,
                username:session?.user?.username,
                message:msg,
                postImg:session?.user?.img,
                senderId:session?.user?.id,
            })
          })
          
          if(!res.ok){
            console.log('something went wrong')
            
          }else{
            setMsg('')
            console.log(res)
           
          }

    }
   
  return (
    <div className={close ? 'modal': 'hide-modal'}>
        <button className='close-btn' onClick={()=> setClose(!close)}><IoMdClose /></button>
        
        <div className='modal-container'>
            <div className='modal-user-info'>
            <p>Chat with {username}</p>
            <Image src={postPic} width={100}
            height={100} />
            </div>
            <form onSubmit={submitMsg}>
                <input
                    value={msg}
                    onChange={(e)=>setMsg(e.target.value)}
                    placeholder='Chat...'
                />
                <button><FiSend /></button>
            </form>
        </div>
    </div>
  )
}

export default Modal