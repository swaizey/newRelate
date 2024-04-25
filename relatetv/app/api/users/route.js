import { connectDB } from '../../lib/database'
import User from '../../models/user'
import { NextResponse } from "next/server"

export async function GET(req){
    
    try {
        await connectDB()
        const users = await User.find()
       return NextResponse.json({users})
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}