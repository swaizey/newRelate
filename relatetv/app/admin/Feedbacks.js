import Image from 'next/image'
import {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Feedbacks = ({reqType}) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    
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
    return (
        <div className='admin'>
          {loading ? <Skeleton count={4} height='7rem' /> : (
            <>
            {items?.feedbacks?.map(i =>(
                <div className='posts' key={i._id}>
                    <Image src={i?.image} width={100} height={100} alt='img' />
                    <div className='posts-info'>
                    <p>Username: {i.username}</p>
                    <p>Feedback: {i.feedback}</p>
                    <p>Gender: {i.gender}</p>
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

export default Feedbacks