import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import sendEmail from "../../email/sendMail.js";
export const forgotPassword = async(req, res)=>{
    const {email}=req.body;
    try{
        const oldUser = await User.findOne({ email })
        if(!oldUser){
            return res.json({ status: "User Does Not exist" });
        }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id },secret,{
        expiresIn: "5m", 
    });
    const link =`${APP_URL}/reset-password/${oldUser._id}/${token}`;
    sendEmail(pw, "fineaiden@gmail.com", link);

    }catch (error){

    }
};