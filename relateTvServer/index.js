require('dotenv').config()
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const PORT = 4000; // Change this to your desired port
const mongoose = require('mongoose');
const Chat = require('../relateTvServer/Chat')
const cors = require('cors')


const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to mongo')
    }catch(error){
        console.log(error)
    }
}
connectDB()

const app = express();
app.use(cors())
const server = http.createServer(app);
const io = socketIO(server,{
    cors:{
        origin:[`http://localhost:3000`, '127.0.0.1:4000'],
        methods:["GET", "POST"]
    }
});

//   SOCKET CODE


io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Listen for incoming chat messages
    
    socket.on('private message', async( chatId, username, senderId, message) => {

        io.emit('receive message',chatId, username, senderId, message)
      
        console.log('private1 message:',[username, chatId, senderId, message]);    
  
      //Save the message to MongoDB
      const chat = await Chat.findById({_id:chatId})
        console.log(chat)
    if(chat){
        await chat.updateOne({$push:{chat:[{username, message, senderId}]}})
        await chat.save()
        console.log({"message":"Chat updated"}, {status:200});
    }else{
        console.log('No chat')
    }
    });

    socket.on('location', (latitude, longitude)=>{
        console.log("from server:",latitude, longitude)
        io.emit('user location',latitude, longitude)
    })
  
    // Listen for user disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });