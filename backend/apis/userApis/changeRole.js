import User from "../../models/User.js"

export const changeRole = async(req, res) => {
    try {
        const { id } = req.params
        const { role } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" })
        }

        user.role = role;

        await user.save();

        res.status(200).json({ status: "ok", data: user });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Server Error" })
    }
}
