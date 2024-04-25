import { connectDB } from "@/app/lib/database"
import Post from "@/app/models/post"
import { NextResponse } from "next/server"
import User from "@/app/models/user"


export async function POST(req){
    const {postBody,amount, duration,location, postOwner, username, image} = await req.json()

    await connectDB()
    await Post.create({postBody,amount,duration,location,postOwner,username, image})
    return NextResponse.json({message:"Request is pending"},{status:200})
}

export async function GET(req){
    await connectDB()
    try{
    const posts = await Post.find({isPending:true}).sort({updatedAt: -1})
    return NextResponse.json({posts})
    }catch(error){
        return NextResponse.json({message:"Faile to load posts", error}, {status:401})
    }
    

}