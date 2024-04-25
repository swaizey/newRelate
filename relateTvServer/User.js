const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    mail:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    spec:[],
    password:{
        type:String,
        required: true
    },
    img: String,
    like:[],
    isAdmin:{
        type:Boolean,
        default: false
    },
    gender:String,
    isVerified:{
        type:Boolean,
        default: false
    },
    isPending:{
        type:Boolean,
        default:true
    },
    verification:String,
}, 
{timestamps:true})

const User = mongoose.model('User', userSchema);

module.exports = User;

