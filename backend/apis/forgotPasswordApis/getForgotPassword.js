import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import sendEmail from "../../email/sendMail.js";
export const getForgotPassword = async(req, res)=>{
  const JWT_SECRET = process.env.JWT_SECRET;

    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  };