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
            enum: ["user", "admin"],
            default: "user"
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema)

export default User;