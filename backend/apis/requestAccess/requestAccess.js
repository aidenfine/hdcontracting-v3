import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'


export const requestAccess = async(req, res)=>{
    const user = mongoose.model('User');
    const { name, email, password, isVerifed } = req.body;

    const encryptedPassword = await bcrypt.hashSync(password, 10);
    try {
      const oldUser = await User.findOne({ email });
  
      if(oldUser){
          return res.send({ error: "User Already exists "});
      }
      const newUser = await user.create({
        name,
        email,
        password: encryptedPassword,
        isVerifed,
      });
      res.send({ status: 'ok', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: 'error', message: 'Failed to create user' });
    }
  };