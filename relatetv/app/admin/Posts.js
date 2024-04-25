import React from 'react'
import './adminpage.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../assets/logo.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Posts = ({reqType}) => {
const [items, setItems] = useState([])
const [loading, setLoading] = useState(false)
const router = useRouter()

useEffect(() => {

   const getPosts = async()=>{
    setLoading(true)
     const res = await fetch(`http://localhost:3000/api/${reqType}`,{
       cache: "no-store",     
     })
     const data = await res.json()
     setItems(data) 
     setLoading(false)
   }
   getPosts()
  }, [])

  const handleChange = async(id)=>{
    await fetch(`http://localhost:3000/api/unpendpost/${id}`,{
    
    })
      router.refresh()
  }
    return (
        <div className='admin'>
          {loading ? <Skeleton count={4} height='7rem' /> : (
            <>
            {items?.posts?.map(i =>(
                <div className='posts' key={i._id}>
                    <Image src={logo} width={100} height={100} alt='img' />
                    <div className='posts-info'>
                    <p>Username: {i.username[0].toUpperCase().concat(i.username.slice(1))}</p>
                    <p>Post: {i.postBody}</p>
                    <p>Address: {i.location}</p>
                    <p>Amount: {i.amount}</p>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px"}}>
              <p>Post status: {i.isPending ? "Pending":"Active"}</p>

              <button onClick={()=>handleChange(i._id)}>
            <label class="switch">
            <input type="checkbox" checked={!i.isPending}/>
            <span class="slider round"></span>
            </label>
            </button>
            </div>
            </div>
                </div>

            ))}
            </>)}
        </div>
      )
}

export default Posts