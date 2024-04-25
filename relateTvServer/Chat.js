const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

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

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
