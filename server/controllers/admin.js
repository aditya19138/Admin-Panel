import mongoose from "mongoose";
import User from "../models/User.js";
import validateLoginInput from "../validation/login.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";


export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const secretOrKey = "secret";
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    errors.message = "Invalid Email ID / password"
    return res.status(200).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Match

        //Create jt payload
        const payload = {
          id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role
        };
        //Sign token
        jwt.sign(
          payload,
          secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              first_name: user.first_name,
              last_name: user.last_name,
              user_id: user._id
            });
          }
        );
      } else {
        return res.status(200).json({ message: "Password incorrect" });
      }
    });
  });
};
