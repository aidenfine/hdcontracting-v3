import User from '../../../backend/models/User.js'

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error("Can't fetch user", error);
    res.status(500).json({ error: "Couldn't fetch user" });
  }
};
