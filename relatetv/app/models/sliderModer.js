import mongoose, {Schema, models} from "mongoose";

const sliderSchema = new Schema({
   postBody: String,
   image:String,
   location: String,
   username:String,
   rating:String

}, 
{timestamps:true})

const Slider = models.Slider || mongoose.model("Slider", sliderSchema)
export default Slider

