require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());

// ✅ Use environment variable instead of hardcoded MongoDB URI
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  number: String,
  role: { type: String, default: "user" },
});

const User = mongoose.model("Users", UserSchema);

let otpStore = {};
const ADMIN_SECRET_KEY = "admin@123";

app.post("/send-otp", (req, res) => {
  const { email, number, role, secretKey } = req.body;

  if (!email || !number) {
    return res
      .status(400)
      .json({ message: "Email and phone number are required" });
  }

  if (role === "admin" && secretKey !== ADMIN_SECRET_KEY) {
    return res.status(400).json({ message: "Invalid admin secret key" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;
  console.log(`OTP for ${email}: ${otp}`);

  res.json({ message: "OTP sent successfully" });
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    res.json({ message: "OTP verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

app.post("/register", async (req, res) => {
  const { username, email, password, number, role, secretKey, otp } = req.body;

  if (!username || !email || !password || !number) {
    return res.status(400).json({ message: "All fields and OTP are required" });
  }

  if (role === "admin" && secretKey !== ADMIN_SECRET_KEY) {
    return res.status(400).json({ message: "Invalid admin secret key" });
  }

  if (otpStore[email] != otp) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  delete otpStore[email];

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    number,
    role,
  });
  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", role: user.role });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));