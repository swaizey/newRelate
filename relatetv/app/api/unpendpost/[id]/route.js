import { connectDB } from '../../../lib/database'
import Post from '../../../models/post'
import { NextResponse } from "next/server"

export async function GET(req, {params}){
    const {id} = params
    
    try {
        await connectDB()
        const post = await Post.findOneAndUpdate({_id: id},[{$set:{isPending:{$not:"$isPending"}}}])
       return NextResponse.json({message:"Post Updated" },post)
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}