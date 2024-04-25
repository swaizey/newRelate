'use client'
import { useSession } from 'next-auth/react'
import {useState} from 'react'
import './page.css'
import { useRouter } from 'next/navigation'



const Feedback = () => {
  const router = useRouter()
  const {data:session} = useSession()
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

    const handleSubmit = async(e)=>{
      e.preventDefault()
      if(!feedback){
        setError('Please provide a feedback')
        return
      }
      if(!session){
        setError('Please log in')
        return
      }
      setLoading(true)
      try {
        const res = await fetch('api/feedbacks',{
          method:'POST',
          headers:{
            "Content-type": "application/json"
          },
          body:JSON.stringify({
            feedback,
            username:session?.user?.username,
            userId:session?.user?.id,
            image:session?.user?.img,
            gender:session?.user?.gender
          })
        })
        if(!res.ok){
          setLoading(false)
          setError('Something went wrong')
        }
        setLoading(false)
        setFeedback('')
        router.refresh()
        
      } catch (error) {
        setLoading(false)
        setError(error)
      }

    }
  
          
  return (
    <div >

      <div id='makeAFeed' className='newFeedback'>
        <form onSubmit={handleSubmit}>
          
          <textarea
          style={{border:error ? "1px solid red": null}}
          placeholder={error ? "Please Proide a feedback" :'Add a Feedback'}
            value={feedback}
            onChange={(e)=>setFeedback(e.target.value)}
          ></textarea>
          <button disabled={loading}>{loading ? 'Submiting...' :'Submit'}</button>
        </form>
      </div>
    </div>
  )
}

export default Feedback