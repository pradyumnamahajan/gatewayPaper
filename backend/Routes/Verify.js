const express = require("express");
const User = require("../Models/User");
const otplib = require("otplib");

const Verify = express.Router();

Verify.post("/", async (req, res) => {
  try {
    let data = await JSON.parse(req.body.data);
    let userData = await User.findOne({
      where: {
        id: data.id,
      },
    });

    // Checks if the TOTP token received matches the generated token at the given epoch
    if (otplib.totp.verify({ token: data.totp, secret: userData.secret })) {
      res.send({ status: "success" });
    } else {
      res.send({ status: "faliure" });
    }
  } catch (e) {
    console.log(e)
    res.send({ status: "faliure" });
  }
});

module.exports = Verify;
