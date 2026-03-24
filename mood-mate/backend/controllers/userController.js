import User from "../models/User.js";

// REGISTER
export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json("User already exists");

    const user = new User({ email, password });
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json("Server error");
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User not found");
    if (user.password !== password)
      return res.status(400).json("Invalid password");

    res.json(user);
  } catch (err) {
    res.status(500).json("Server error");
  }
};