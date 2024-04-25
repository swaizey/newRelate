import mongoose, {Schema, models} from "mongoose";

const userSchema = new Schema({
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

const User =models.User || mongoose.model("User", userSchema)
export default User

