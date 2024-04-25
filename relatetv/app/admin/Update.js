'use client'
import {useState, useEffect} from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from '../firebase'
import {IoPersonCircleOutline} from 'react-icons/io5'
import { FaStar } from "react-icons/fa6";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Update = () => {
    const router = useRouter()
    const [slides, setSlides] = useState([])
    const [postBody, setPostBody] = useState('')
    const [location, setLocation] = useState('')
    const [img, setImg] = useState('')
    const [rating, setRating] = useState('')
    const [username, setUsername] = useState('')
    const [progress, setProgress] = useState('')
    const [val, setVal] = useState('')
    const [imgUpload, setImgUpload] = useState('')
    const [loading, setIsLoading] =useState(false)
    const [notice, setNotice] = useState('')
    useEffect(()=>{
        const getSlides = async()=>{
          setIsLoading(true)
            const res = await fetch('http://localhost:3000/api/admin',{cache:"no-store"})
            if (!res.ok){
                throw new Error('Cant load status')
            }
            const data = await res.json()
            setSlides(data)
            setIsLoading(false)
        }
        getSlides()
    },[])

    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        if(!postBody || !username || !img || !location){
          setNotice('Some fields are required')
        }
        setIsLoading(true)
        try {
          const res = await fetch('api/admin',{
            method:'POST',
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({
                postBody,
                image:img,
                location,
                username,
                rating
            })
          })
          
        if(!res.ok){
          let msg =await res.json()
          setNotice(msg.message)
          setIsLoading(false)
        }else{
          setImg('')
          setLocation('')
          setUsername('')
          setPostBody('')
          setRating('')
          router.refresh()
          setIsLoading(false)
        }
        } catch (error) {
         console.log(error)
          
        }
          
      }

    const handleFileUpload =async (e) =>{
        const metadata = {
          contentType: 'image/jpeg'
        };
        const selectedFile = e.target.files[0]
        const storageRef = ref(storage, 'images/' + selectedFile.name);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile, metadata);
        uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      
      setVal(progress)
      setProgress(progress)
      setImgUpload(progress);    
  
    }, 
    (error) => {
      console.log(error)
      },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImg(downloadURL);
        setImgUpload('')
      });
    }
  );
}

const handelDelete = async(id)=>{
  try {
    const res = await fetch(`api/admin/${id}`,{
      method:'DELETE'})
      if(res.ok){
        router.refresh()
      }
  } catch (error) {
    console.log(error)
  }
}
  
  return (
    <div className='admin'>
       
      {loading ? <Skeleton count={3} height='5rem' /> : (
            <>
        {slides?.map(slide =>(
            <div key={slide?._id} className='status-body'>
            <div className='status'>
                <div className='status-img'>
                    <Image src={slide?.image} alt='img' width={100} height={100} />
                </div>
                <div className='status-info'>
                    <p>{slide?.username}</p>
                    <p>{slide?.postBody}</p>
                    <p>{slide?.location}</p>
                    <p>{slide?.rating.slice(0, 1) }</p>
                </div>
            </div>
            <div className='status-btn'>
              <button  className='status-edit'>Edit</button>
              <button onClick={()=>handelDelete(slide?._id)} className='status-delete'>Delete</button>
            </div>
            </div>
        ))}
        </>)}
    <div className='update-form-div'>
         <form className='update-form' onSubmit={handleSubmit}>
        <input 
            placeholder='Username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
        />
        <input 
            placeholder='Location'
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
        />
        <input 
            placeholder='Comment'
            value={postBody}
            onChange={(e)=>setPostBody(e.target.value)}
        />
        <input 
            placeholder='Rating'
            value={rating}
            onChange={(e)=>setRating(e.target.value)}
        />
        <div className='imgUpload'>
           <label htmlFor='fileUpload' className='pic'>
              {img ? (<Image src={img} width={60} height={60} alt='img' />): <IoPersonCircleOutline style={{width:'100%', height:'100%'}} />}
           
           </label>
           <div className='progress'>
              {imgUpload && <CircularProgressbar  value={val} progress={progress}  />}
           </div >
           
           </div>
           <input className='file'
           type='file'
           id='fileUpload'
           onChange={(e)=>handleFileUpload(e)}
           />
        <button >{loading ? 'Uploading' : 'submit'}</button>
    </form>
    </div>
    </div>
  )
}

export default Update