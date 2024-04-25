import { connectDB } from "@/app/lib/database";
import Feedback from "@/app/models/feedback";
import { NextResponse } from "next/server";

export async function POST(req){
    const {feedback, username, userId, image, gender} = await req.json()
    await connectDB()
    await Feedback.create({feedback, username, userId, image, gender})
    return NextResponse.json({message:"Feedback created"})

}
 
export async function GET(req){
    await connectDB()
    try {
        const feedbacks = await Feedback.find().sort({updatedAt: -1})
        return NextResponse.json({feedbacks})
    } catch (error) {
        console.log(error)
    }
}
