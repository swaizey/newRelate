import { connectDB } from '../../../lib/database'
import User from '../../../models/user'
import { NextResponse } from "next/server"

export async function GET(req, {params}){
    const {id} = params
    
    try {
        await connectDB()
        const user = await User.findOneAndUpdate({_id: id},[{$set:{isPending:{$not:"$isPending"}}}])
        console.log(user)
       return NextResponse.json({message:"User Updated"},user)
       
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}