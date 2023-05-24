import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken'

export const loginUser = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
    
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.json({ error: "User does not exist" });
    }
    if (!user.isVerifed){
      return res.json({ error: "You must be verified to login" })
    }
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({}, JWT_SECRET);
  
      if (res.status(201)) {
        return res.json({ status: "ok", data: token });
      } else {
        return res.json({ error: "error" });
      }
    }
  
    res.json({ status: "error", error: "Incorrect password" });
  };
  