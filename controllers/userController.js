const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const existedUser = await userModel.findOne({ email: email });
    if (existedUser) {
      return res.status(500).json({ message: "User already Present" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json(createUser);
  } catch (error) {
    console.log(error);
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const existedUser = await userModel.findOne({ email: email });
    if (!existedUser) {
      return res.status(500).json({ message: "User Not Found" });
    } else {
      const matchPassword = await bcrypt.compare(
        password,
        existedUser.password
      );
      if (!matchPassword) {
        return res.status(500).json({ message: "Wrong Credentials" });
      }
      res.status(201).json(existedUser);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signup, signin };
