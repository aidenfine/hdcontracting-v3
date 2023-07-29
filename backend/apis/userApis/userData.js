import User from "../../models/User.js";
import jwt from 'jsonwebtoken';

export const userData = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;

  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    try {
      const data = await User.findOne({ email: userEmail })
      res.send({ status: "ok", data: data });
    } catch (error) {
      res.send({ status: "error", data: error });
    }
  } catch (error) {
    res.send({ status: "error", data: "Invalid token" });
  }
};
