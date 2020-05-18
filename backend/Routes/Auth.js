const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sha256 = require("../Security/sha256");
const Auth = express.Router();

const User = require("../Models/User");

Auth.post("/register", async (req, res) => {
  let userExists = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (userExists) {
    res.send("User already exists");
  } else {
    // This regex can be changed depending on which emails are allowed
    let checkOfficialEmail = /@vit\.edu\.in$/g;

    if (!req.body.email.match(checkOfficialEmail)) {
      res.send("Only VIT emails allowed");
    }

    try {
      // Password is hashed before saving
      let hash = await bcrypt.hash(req.body.password, 10);

      let userData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hash,
        created: new Date(),
      };

      let newUser = await User.create(userData);

      // Making a JWT which expires in 6 hours
      let verificationToken = jwt.sign(
        newUser.dataValues.id,
        process.env.JWT_SECRET,
        { expiresIn: 6 * 60 * 60 }
      );

      // Sending the verification email
      let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });

      let url = `${process.env.URL}/auth/confirmation/${verificationToken}`;

      transporter.sendMail({
        to: req.body.email,
        subject: "Confirm Email",
        html: `Please click this Link to confirm your email: <a href="${url}">${url}</a>`,
      });

      res.send("Success: Registration successful, verification email sent.");
    } catch (error) {
      console.log(error);
      res.send("Error");
    }
  }
});

Auth.post("/login", async (req, res) => {
  // Messages sent on unsuccessful login attempts are kept generic to increase the
  // difficulty for attackers to gather valid email ids

  try {
    let user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If there is no user with this email
    if (!user) {
      res.send("Wrong email/password");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      if (!user.verified) {
        return res.send("Verification incomplete");
      }

      if (!user.secretSent && user.verified) {
        // Generating a pseudo random number for shared secret
        let seed = user.email + Date.now();
        let secret = sha256.SHA256(seed);

        await User.update(
          {
            secret,
            secretSent: true,
          },
          {
            where: {
              id: user.id,
            },
          }
        );

        return res.json({
          secret,
          id: user.id,
        });
      }

      // To avoid logins from multiple devices
      res.send("User already signed in");
    } else {
      // Wrong Password
      res.send("Error: Wrong Email/Password");
    }
  } catch (error) {
    res.send("Error");
  }
});

Auth.get("/confirmation/:token", async (req, res) => {
  try {
    const id = jwt.verify(req.params.token, process.env.JWT_SECRET);
    await User.update({ verified: true }, { where: { id } });
  } catch (error) {
    res.send("Error");
  }

  res.send("Verification Successful");
});

module.exports = Auth;
