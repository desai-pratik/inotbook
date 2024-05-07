const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const User = require("../models/User");
const { validationResult, body } = require("express-validator");

const jwt_secrete = "mynameispratikdesai";
let success = false;

// router 1
router.post(
  "/createuser",
  [
    // for validation errror
    body("name", "name is not valid.").isLength({ min: 3 }),
    body("email", "email is not valid.").isEmail(),
    body("password", "password is not valid.").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
    success = false;
      return res.status(400).json({success, result: result.array() });
    }

    try {
      // if user ragister with mail
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({success , error: "Email is already exist." });
      }
      // for password sequere
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_secrete);
      success = true;
      res.json({success, authToken: authToken });
    } catch (error) {
      console.error(error.message); 
      res.status(500).send("internal server error.");
    }
  }
);

// router 2  for login
router.post(
  "/login",
  [
    body("email", "email is not valid.").isEmail(),
    body("password", "password can not be blank.").exists(),
  ],
  async (req, res) => {
    // error hendling
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "user not exist.",success });
      }
      const passwordCompere = await bcrypt.compare(password, user.password);
      if (!passwordCompere) {
        success = false;
        return res.status(400).json({error: "user not exist.", success });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwt_secrete);
       success = true;
      res.json({ authToken: authToken, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.");
    }
  }
);

// router 3 for login user detials
router.post( "/getuser", fetchuser, async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error.");
    }
  }
);

module.exports = router;
