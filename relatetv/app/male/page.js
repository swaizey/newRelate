'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import {IoPersonCircleOutline} from 'react-icons/io5'
import './page.css'
import {useRouter, usePathname} from 'next/navigation'
import {analytics} from '../firebase'
import {ref, uploadBytes, getDownloadURL,uploadBytesResumable} from'firebase/storage'

const MaleRegForm = () => {
    const router = useRouter()
    const pathname = usePathname()
    const gender = pathname.slice(1)
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [mail, setMail] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [spec, setSpec] = useState([])
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] =useState('')
    const [img, setImg] = useState('')
    const [notice, setNotice] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    

    const specs = [{id:1, spec:'Light skin', checked:false}, {id:2, spec:'Dark skin', checked:false}, {id:3, spec:'Big boobs and ass', checked:false}, {id:4, spec:'Portable', checked:false}, {id:5, spec:'Brown skin', checked:false}, {id:6, spec:'Big ass small boobs', checked:false}, {id:7, spec:'Small ass big boobs', checked:false}]
  
    const handleSubmit = async(e) =>{
      e.preventDefault()
      
      if(!name && !lastname && !username && !mail && !address && !password){
        setNotice('All fields are required')
      }else if(password !== confirmPwd){
        setNotice('Passwords does not match')
      }
      setIsLoading(true)
      try {
        const res = await fetch('api/register',{
          method:'POST',
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify({
            name,phone:phone?.trim(), lastname,username:username?.trim().toLowerCase(),password,mail:mail?.trim().toLowerCase(),address,img, spec,gender
          })
        })
        
      if(!res.ok){
        let msg =await res.json()
        setNotice(msg.message)
        setIsLoading(false)
      }else{
        router.push('/')
      }
      } catch (error) {
       console.log(error)
        
      }
        
    }
    const handleCheck=(spc)=>{

      setSpec([...spec, spc])
      console.log(spec)
    }

    const handleFileUpload =async (e) =>{
      const selectedFile = e.target.files[0]
      if(selectedFile){
        const fileRef = ref(analytics, 'relatepics')
  
        uploadBytes(fileRef, selectedFile).then((data)=>(
          getDownloadURL(data.ref).then(url=>(
            setImg(url)
            ))
            ))}
      }
      

  return (

    <form  onSubmit={handleSubmit} className='guyReg'>
        
        <p style={{color:'white',textAlign:'center'}}>Registration</p>
        
        <div className='form'>
          <>
         
            <input 
            placeholder='Username'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            
           />
        
           
           <input 
            placeholder='Name'
            value={name?.trim()}
            onChange={(e)=> setName(e.target.value)}
           />
            <input 
            placeholder='Lastname'
            value={lastname?.trim()}
            onChange={(e)=> setLastname(e.target.value)}
           />
         
            
            <input 
            placeholder='Address'
            value={address}
            onChange={(e)=> setAddress(e.target.value)}
           />
           
           <input 
            placeholder='Phone'
            value={phone}
            onChange={(e)=> setPhone(e.target.value)}
           />
            <input 
            placeholder='Mail'
            value={mail}
            onChange={(e)=> setMail(e.target.value)}
           />
          
           
           <input 
            placeholder='Password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
           />
            <input 
            placeholder='Confirm password'
            value={confirmPwd}
            onChange={(e)=> setConfirmPwd(e.target.value)}
           />
          
           <label htmlFor='fileUpload' className='pic'>
              {img ? (<Image src={img} width={60} height={60} alt='img' />): <IoPersonCircleOutline style={{width:'100%', height:'100%'}} />}
           
           </label>
           <input 
           type='file'
           accept='.jpeg, .png, .jpg'
           id='fileUpload'
           onChange={(e)=>handleFileUpload(e)}
           />
           
           <p style={{marginBottom:'10px', textDecoration:'underline'}}>What type of girl do you like?</p>
            <ul>
           {specs.map((sp)=>(
            
            <li key={sp.id} className='spec'>
                <input 
                onChange={()=>handleCheck(sp.spec)}
                type='checkbox'
                />
                <span>{sp.spec}</span>
            </li>
           
           ))}
           </ul>
          
           </>
            <p>{notice}</p>
        <button  disabled={isLoading} style={{background:isLoading? "red": "#048dd5"}}>{isLoading ? 'Registering...': "Submit"}</button>
        <p >Already have an account? <Link style={{textDecoration:'underline'}} href='login'>Login</Link></p>
        </div>
        
    </form>
  )
}

export default MaleRegForm


