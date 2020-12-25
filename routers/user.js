const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

//User Model
const User = require("../models/User");

//@route POST api/users
//@desc create user
//@access Public
router.post(
  "/add",
  [
    check("name", "name is required").not().isEmpty(),
    check("usertype", "usertype is required").not().isEmpty(),
    check("email", "email is required").not().isEmpty(),
    check("password", "password is required").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are any errors in check function it will be stored in errors
    // and will be checked through IF condition that is there any error or not
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //if there are no errors then it will store all the data in the const values.
    const { name, email, usertype, password } = req.body;
    //now will try to store data in DB
    try {
      // check if user email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msg: "User email already registered" }] });
      }
      //creating new user
      user = new User({
        name: req.body.name,
        email: req.body.email,
        usertype: req.body.usertype,
        password: req.body.password,
      });
      //Encrypting password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      //storing user to DB
      await user.save();
      // sending token to res by getting user id from DB
      const payload = {
        user: {
          id: user.id,
        },
      };
      //using JWT for token genration with id
      jwt.sign(payload, "POStoken", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        else res.status(200).json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/users
//@desc delete user
//@access private
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    await user.remove();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
