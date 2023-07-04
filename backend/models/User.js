import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            min: 2,
            max: 100,
        },
        email:{
            type: String,
            required:true,
            max: 50,
            unique: true
        },
        password:{
            type: String,
            required:true,
            min: 5
        },
        role:{
            type: String,
            enum: ["user", "admin", "owner"],
            default: "user"
        },
        isVerifed:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema, 'users')

export default User;