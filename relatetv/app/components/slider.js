'use client'
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './components.css';
import { FaStar } from "react-icons/fa6";
import { Pagination } from 'swiper/modules';
import { IoLocation } from "react-icons/io5";
import Image from 'next/image';

export default function Slider() {
  const [items, setItems] = useState([])
  useEffect(()=>{
    const getSlides= async()=>{
      const res = await fetch('http://localhost:3000/api/admin')
      const data = await res.json()
      setItems(data)
    }
    getSlides()
  },[])


  return (
    <>
      <Swiper
        direction={'horizontal'}
        pagination={{
          clickable: true,
        }}
        autoplay
        modules={[Pagination]}
        className="mySwiper"
      >
       
        {items?.map(item=>(
          
         <SwiperSlide key={item?._id} >   
         <div style={{backgroundImage:`url(${item?.image})`, backgroundRepeat:"no-repeat",backgroundSize:"cover", width:'100%', height:'100%' }} className='slides'>

          <Image className='slide-img' src={item?.image} alt="img" width={100} height={100} />
          <div className='slide-box'>
          <div className='slide-info'>
          <p>{item?.username}</p>
          <p>{item?.postBody}</p>
          <p className='location'><IoLocation /> {item?.location}</p>
          <p className='star'><FaStar /> <span>{item?.rating.slice(0, 1)}</span> </p>
          </div>
          </div>
          <div className='blur'>
          
          </div>
          </div>
          </SwiperSlide>
        ))}
      
      </Swiper>
    </>
  );
}
