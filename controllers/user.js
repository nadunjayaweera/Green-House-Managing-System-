const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
require("dotenv").config();

async function register(req, res) {
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email address already exists" });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "user", // default to 'user' role
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
      { expiresIn: 86400 }
    ); // expires in 24 hours
    res.status(200).send({ auth: true, token: token });
  } catch (error) {
    console.error("Error registering user: " + error);
    res.status(500).json({ message: "Error registering user" });
  }
}

function login(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: 86400 }
    ); // expires in 24 hours
    res.status(200).send({
      auth: true,
      token: token,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  });
}

module.exports = { register, login };
