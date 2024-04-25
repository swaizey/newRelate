import {useEffect, useState} from 'react'
import Skeleton from 'react-loading-skeleton'



const Chats = ({reqType}) => {
    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const getChats = async()=>{
         setLoading(true)
          const res = await fetch(`http://localhost:3000/api/${reqType}`,{
            cache: "no-store",     
          })
          const data = await res.json()
          setChats(data) 
          setLoading(false)
        }
        getChats()
       
       }, [])
       return (

        <div className='admin'>
             {console.log(chats)}
          {loading ? <Skeleton count={4} height='7rem' /> : (
            <>
            {chats?.map(i =>(
                <div className='posts' key={i._id}>
                    <div className='members'>
                        <p>Chat between{}</p>
                    </div>
                 </div>

            ))}
            </>)}
        </div>
      )
}

export default Chats