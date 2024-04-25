import React, { useState } from 'react';
import io from 'socket.io-client';

const Location =()=>{
  const [userLocation, setUserLocation] = useState(null);
  const socket = io.connect('http://localhost:4000');
  const getUserLocation = () => { 
    
    if (navigator.geolocation) {
      // what to do if supported
      navigator.geolocation.getCurrentPosition((position) => {
            // what to do once we have the position
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude })
            console.log(latitude, longitude )
            
            socket.emit('location', latitude, longitude)
        },
        (error) => {
            // display an error if we cant get the users position
            console.error('Error getting user location:', error);
        });}else {
      // display an error if not supported
      console.error('Geolocation is not supported by this browser.');
  }
   }

   socket.on('user location', (latitude, longitude)=>{
    console.log(latitude, longitude)
   })

   const cancelLocation =()=>{
    setUserLocation(null)
   }


    return(
        <>
        <button onClick={getUserLocation}>Get User Location</button>
        <button onClick={cancelLocation}>cancelLocation Location</button>
        
        {userLocation && (
    <div style={{paddingBottom:"30px"}}>
        <h2>User Location</h2>
        <p>Latitude: {userLocation.latitude}</p>
        <p>Longitude: {userLocation.longitude}</p>

    </div>
)}
        </>
    )
}

export default Location