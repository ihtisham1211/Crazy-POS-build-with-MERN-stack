const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

//@route GET api/auth
//@desc auth token if its loged in
//@access Public
router.get("/", auth, async (req, res) => {
  //due to auth function it will send the id of the user in req
  try {
    //this will send the id of the user to res
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

//@route POST api/auth
//@desc Auth user and get token
//@access Public
router.post(
  "/",
  [
    check("email", "Please enter a Valid email").not().isEmpty(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    //finding user and matching password
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //decrypting password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Password incorrect" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "POStoken", { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
