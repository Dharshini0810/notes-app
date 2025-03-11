const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc User SignUp
//@URL POST /api/user/sigup
//@route public
const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("All fields are required.Fields Missing");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already registered");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password" + hashedPassword);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  if (user) {
    console.log(`User created ${user}`);
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User is not valid");
  }
});

//@desc User login
//@URL POST /api/user/login
//@route public
const userLogin = asyncHandler(async (req, res) => {
  console.log("Start of login")
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("All fields are required");
  }
  console.log("First")
  const user = await User.findOne({ email });
  console.log("Second")
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("Second In")
    const accessToken = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    console.log({user:{ id : user.id },accessToken : accessToken})
    res.status(200).json( {user:{ id : user.id, name : user.name },accessToken : accessToken});
  }
  else{
    console.log("Third")
    res.status(400)
    throw new Error("Enter the correct credentials")
  }
});

//@desc Get current user
//@URL GET /api/user/current
//@route private
const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { userLogin, userSignUp, currentUser };
