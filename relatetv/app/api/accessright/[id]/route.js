import { connectDB } from '../../../lib/database'
import User from '../../../models/user'
import { NextResponse } from "next/server"

export async function GET(req, {params}){
    const {id} = params
    
    try {
        await connectDB()
        const user = await User.findOne({_id: id},[{$set:{isAdmin:{$not:"$isAdmin"}}}])
       return NextResponse.json({message:"User Updated" })
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}