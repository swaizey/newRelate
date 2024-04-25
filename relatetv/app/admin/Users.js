'use client'
import {useState, useEffect} from 'react'
import './adminpage.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Users = ({reqType}) => {
  const router = useRouter()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
   useEffect(() => {
  
    const getUsers = async()=>{
      setLoading(true)
      const res = await fetch(`http://localhost:3000/api/${reqType}`,{
        cache: "no-store",     
      })
      const data = await res.json()
      setItems(data)
      setLoading(false)
      
    }
    getUsers()
  
   }, [])
   
  const handleChange = async(id)=>{
    const res = await fetch(`http://localhost:3000/api/accessright/${id}`)
      
    
    }

  const handleChange2 = async(id)=>{
    await fetch(`http://localhost:3000/api/userpending/${id}`,{
    
    })
  router.refresh()
}
    
 
  return (
    <div className='admin'>
      {loading ? 
      <div className='loader'>
      <Skeleton count={1} height='5rem' width='5rem'/>
      <Skeleton count={6} height='2rem' />
    
      </div>
     
       : (
            <>
       {items?.users?.map(i =>(
        <div className='user'>
          <Image src={i.img} width={100} height={100}alt='img'/>
            <div className='user-info'>
            <p>{i.username}</p>
            <p>{i.name} {i.lastname}</p>
            <p>{i.address}</p>
            <p>{i.gender}</p>

            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px"}}>
            <p>Admin right </p>
            <button onClick={()=>handleChange(i._id)}>
            <label class="switch">
            <input type="checkbox" checked={i.isAdmin}/>
            <span class="slider round"></span>
            </label>
            </button>

            </div>
            
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px"}}>
              <p>User status: {i.isPending ? "Pending":"Active"}</p>

              <button onClick={()=>handleChange2(i._id)}>
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

export default Users