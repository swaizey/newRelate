import { connectDB } from "@/app/lib/database"
import User from "@/app/models/user"
import mongoose from "mongoose"
import {  NextResponse } from "next/server"


export async function GET(req, {params}){
    const {user} = params
    await connectDB()

    if(mongoose.Types.ObjectId.isValid(user)){
        const otherUser = await User.findById({_id:user})
    if(otherUser){
       return NextResponse.json({otherUser})
    }else{
        return NextResponse.json('No user')
    }
      
    }else{
        console.log('no user')
        return NextResponse.json('No user')
    
    }
    
}