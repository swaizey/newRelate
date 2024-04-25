import { connectDB } from "@/app/lib/database"
import Chat from "@/app/models/chat"
import {  NextResponse } from "next/server"

export async function POST(req, {params}){
  const {ids} = params

    const {  username,  message,senderId, postImg} = await req.json()
  await connectDB()
  const chat = await Chat.findOne({members:{userId:ids[0], postOwner:ids[1]}})
          
          if(!chat){
             const newChat = await Chat.create({
                members:{userId:ids[0], postOwner:ids[1]},
                postImg,
                chat: [{username, message, senderId}]
              });
          return NextResponse.json({message:'Chat Created', newChat}, {status:200});
          }else{
            await chat.updateOne({$push:{chat:[{username, message, senderId}]}})
            await chat.save()
            return NextResponse.json({message:'Chat Appended', chat}, {status:200});
            
          }
            
}


export async function GET(req,{params}){
  const {ids} = params
     console.log(ids[0])
    
  await connectDB()
  const chat = await Chat.find({$or:[{"members.userId":ids[0]},{"members.postOwner":ids[0]} ]})
  if(chat){
    return NextResponse.json(chat)
  }else{
    return NextResponse.json({message:'no chat found'})
  }
  
}
