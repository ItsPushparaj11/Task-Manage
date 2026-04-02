const router = require("express").Router();
const User = require("../user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });

  await user.save();
  res.send("User Created");
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secretkey");
  res.json({ token });
});

module.exports = router;