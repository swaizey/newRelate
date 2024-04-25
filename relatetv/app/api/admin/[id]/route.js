import Slider from "@/app/models/sliderModer"
import { connectDB } from "@/app/lib/database"
import { NextResponse } from "next/server"


export async function PUT(req, {params}){
    const {id} = params
    const {postBody,location, image,rating, username} = await req.json()

    await connectDB()
    await Slider.findByIdAndUpdate({_id:id},{postBody,location, image,rating, username})
    return NextResponse.json({message:"Updated"},{status:200})
        
}
export async function DELETE(req, {params}){
    const {id} = params
    await connectDB()
    await Slider.findByIdAndDelete({_id:id})
    return NextResponse.json({message:"Deleted"},{status:200})
}