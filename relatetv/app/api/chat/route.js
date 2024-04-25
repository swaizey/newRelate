import { connectDB } from "@/app/lib/database"
import Chat from "@/app/models/chat"
import {  NextResponse } from "next/server"

export async function POST(req){
 
    const { postOwner, userId, username, message, senderId} = await req.json()
        await connectDB()
          if(userId === postOwner){
            return NextResponse.json({message:'forbidden'}, {status:401})
          }
          const chat = await Chat.findOne({members:{userId, postOwner}})
          
          if(!chat){
             const newChat = await Chat.create({
                members:{userId, postOwner},
                chat: [{username, message, senderId}]
              });
          return NextResponse.json({message:'Chat Created', newChat}, {status:200});
          }else{
            await chat.updateOne({$push:{chat:[{username, message, senderId}]}})
            await chat.save()
            return NextResponse.json({message:'Chat Appended', chat}, {status:200});
            
          }
            
}
export async function GET(res){
  await connectDB()
  const chats = await Chat.find()
  try {
    return NextResponse.json(chats)
  } catch (error) {
    return NextResponse.json(error)
  }
}
