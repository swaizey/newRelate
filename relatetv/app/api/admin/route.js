import Slider from "@/app/models/sliderModer"
import { connectDB } from "@/app/lib/database"
import { NextResponse } from "next/server"

export async function POST(req){
    const {postBody,location, image,rating, username} = await req.json()

    await connectDB()
    await Slider.create({postBody,location, image,rating, username})
    return NextResponse.json({message:"Created"},{status:200})
        
}

export async function GET(){
    await connectDB()
    const slides = await Slider.find().sort({updatedAt: -1})
    return NextResponse.json(slides)
}