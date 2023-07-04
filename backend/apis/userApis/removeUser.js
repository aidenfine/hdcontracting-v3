import User from "../../models/User.js";

export const removeUser = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndRemove(id);
        
        if(!deletedUser){
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ message: "User Removed "})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "other error occurred "})
    }
}