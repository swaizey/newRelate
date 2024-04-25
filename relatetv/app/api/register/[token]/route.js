import { connectDB } from '@/app/lib/database'
import User from '@/app/models/user'
import { NextResponse } from 'next/server'
import {redirect} from 'next/navigation'

export async function GET(req, {params}){
    const {token} = params
    await connectDB()
    const user = await User.findOne({verification: token})
    try{
        if(!user){
            return NextResponse.json({message:'Invalid token'},{status:500})
        }else{
            user.isVerified = true
            user.verification = null
            user.save()
            redirect('http://localhost:3000') 
        }    
    }catch(error){
        return NextResponse.josn({message:'Something went wrong, try again'}, error)
    }
}