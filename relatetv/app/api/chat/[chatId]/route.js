import { connectDB } from "@/app/lib/database"
import Chat from "@/app/models/chat"
import {  NextResponse } from "next/server"


export async function GET(req, {params}){
    const {chatId} = params
    await connectDB()
    
    const chat = await Chat.findById({_id:chatId})
    
    if(chat){
       return NextResponse.json({chat})
    }else{
        return NextResponse.json('No chat')
    }
}

export async function POST(req, {params}){
    const {chatId} = params
    const {senderId, username, message} = await req.json()
    await connectDB()
    
    const chat = await Chat.findById({_id:chatId})
    
    if(chat){
        await chat.updateOne({$push:{chat:[{username, message, senderId}]}})
        await chat.save()
        return NextResponse.json({message:"Chat created"}, {status:200});
    }else{
        return NextResponse.json('No chat')
    }
}