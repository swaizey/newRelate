import mongoose, {Schema, models} from "mongoose";

const feedbackSchema = new Schema({
   feedback: String,
   username: String,
   userId: String,
   image: String,
   gender:String,
   isPending:{
      type:Boolean,
      default:true
   }
   
}, 
{timestamps:true})

const Feedback = models.Feedback || mongoose.model("Feedback", feedbackSchema)
export default Feedback

