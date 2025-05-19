import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
        },
        lastName:{
            type: String,
        },
        email:{
            type: String,
            unique: true,
            required: true,
        },
        password:{
            type: String,
        },
        isProfileSetUp:{
            type:Boolean,
            default:false,
        },
        profilePicture:{
            type:String
        },       
        skills:{
            type:String
        },       
        description:{
            type:String
        },
        age:{
            type:Number,
        },
        city:{
            type:String,
        },
        gender:{
            type:String,
        },
        college:{
            type:String,
        },
        tasksAccepted:{
            type:Number,
            default:0,
        },
        tasksPosted:{
            type:Number,
            default:0,
        },
        givenId:{
            type:Number,
            required:true,
            unique:true
        },
        UserRating:{
            type:Number,
            default:0,
            min:0,
            max:5
        },
    },
    {timestamps:true}
);
const User = mongoose.model("User",userSchema);
User.collection.createIndex({ givenId: 1 }, { unique: true })
  .then(() => console.log("Unique index added to givenId"))
  .catch(err => console.error("Error creating index:", err));
export default User