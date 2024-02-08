import mongoose from "mongoose";
import { boolean } from "zod";

const userSchema = new mongoose.Schema({
    id:{type:String,required:true},
    username: {type:String,required:true},
    name:{type:String,required:true},
    image:String,
    bio:String,
    threads: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Thread'
        }
    ], // One user can have many threads
    onboarded:{
        type:Boolean,
        default:false,
    },
    communities:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Community'
        }
    ]

});

 // Fetch a user , or create one if none exist
const User=mongoose.model.User || mongoose.model('User',userSchema);

export default User;