import mongoose, {Schema, models} from "mongoose";

const chatSchema = new Schema({

   members: {
        userId:String,
        postOwner:String
   },
   postImg:String,
    chat:[{
        type:new mongoose.Schema({
        username:String,
        message:String,
        senderId:String
        },{timestamps:true})
    }]
},
{timestamps:true})

const Chat = models.Chat || mongoose.model("Chat", chatSchema)
export default Chat
