import mongoose from "mongoose";
import User from "../../models/User.js";

export const getAllUsers = async(req, res) => {
    try{
        const allUser = await User.find({});
        res.send({ data :allUser })
    } catch (error){
        console.log(error)
    }
}