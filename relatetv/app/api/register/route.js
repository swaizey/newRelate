import { connectDB } from '../../lib/database'
import User from '../../models/user'
import { NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import nodemailer from 'nodemailer'


//send verification token
async function sendVerificationEmail(mail, verificationToken){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'p.adigwe1@gmail.com',
            pass:'ljiehxfmwksnhesf'
        }})

        const mailOptions={
            from: 'RelateTv',
            to:mail,
            subject:'Email Verification',
            text: `Please click the link to verify your mail http://localhost:3000/api/register/${verificationToken}`
            
        }
        try {
            await transporter.sendMail(mailOptions)
        } catch (error) {     
           console.log({message:'Error on verification'})
        }
}


export async function POST(req){
    const { name, username, lastname, address, phone, password, img, mail, spec,gender} = await req.json()
    const hashedPwd = await bcrypt.hash(password, 10)
    console.log(username)
    try {
        
        await connectDB()
        const usernameExist = await User.findOne({username:username.trim().toLowerCase()})
        const mailExist = await User.findOne({mail:mail.trim().toLowerCase()})
        const phoneExist = await User.findOne({phone:phone.trim()})

        
        if(usernameExist){
            return NextResponse.json({message:'Username exist'},{status:409})
        }else if(mailExist){
            return NextResponse.json({message:'Mail exist'},{status:409})
        }else if(phoneExist){
            return NextResponse.json({message:'Phone number exist'},{status:409})
        }else{
        const newUser = {
            name,
            username,
            lastname,
            phone,
            address,
            password: hashedPwd,
            mail,
            spec,
            img,
            gender,
            verification: crypto.randomBytes(20).toString('hex')
        }
        console.log(newUser)
         await User.create(newUser)
        

        sendVerificationEmail(newUser.mail, newUser.verification)
        return NextResponse.json({message:'User reistered'},{status:201})
        
        }    
  
    } catch (error) {
        return NextResponse.json({message:`Error occured while reistering ${error}`},{status:500})
    }
}

export async function GET(req){
    
    try {
        await connectDB()
        const users = await User.find()
       return NextResponse.json({users})
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function DELETE(req){
    const id = req.nextUrl.searchParams.get("id")
    await connectDB()
    await User.findByIdAndDelete(id)
    return NextResponse.json({message:"User deleted"}, {status: 200})
}





