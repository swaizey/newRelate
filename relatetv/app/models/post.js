import mongoose, {Schema, models} from "mongoose";

const postSchema = new Schema({
   postBody: String,
   amount: String,
   location: String,
   isPending:{
      type:Boolean,
      default: true
   },
   duration: String,
   username:String,
   image:String,
   postOwner:{type:Schema.Types.ObjectId, ref:"User"}
}, 
{timestamps:true})

const Post = models.Post || mongoose.model("Post", postSchema)
export default Post

