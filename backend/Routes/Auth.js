const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const Auth = express.Router()

const User = require('../Models/User')


Auth.post('/register', async (req, res) => {

    let userExists = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (userExists) {
        res.send("User already exists")
    } else {

        let checkOfficialEmail = /@vit\.edu\.in$/g

        if (!req.body.email.match(checkOfficialEmail)) {
            res.send("Only VIT emails allowed")
        }

        try {
            let hash = await bcrypt.hash(req.body.password, 10)

            let userData = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash,
                created: new Date(),
            }

            let newUser = await User.create(userData)

            let verificationToken = jwt.sign(newUser.dataValues.id, process.env.JWT_SECRET)
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD
                }
            })

            let url = "http://localhost:5000/auth/confirmation/" + verificationToken


            transporter.sendMail({
                to: req.body.email,
                subject: 'Confirm Email',
                html: `Please click this Link to confirm your email: <a href="${url}">${url}</a>`,
            })

        

            res.send("Success: Registration successful, verification email sent.")

        } catch (error) {
            console.log(error)
            res.send("Error")
        }
    }

})

Auth.post('/login', async (req, res) => {

    try {

        let user = await User.findOne({
            where: {
                email: req.body.email,
            }
        })

        if (!user) {
            res.send("Wrong email/password")
        }


        if (bcrypt.compareSync(req.body.password, user.password)) {

            if (!user.verified) {
                res.send("Verification incomplete")
            }

            let token = jwt.sign({
                name: user.name,
                email: user.email,
            }, process.env.JWT_SECRET)

            res.json({
                "message": "Logged in",
                "token": token
            })

        } else {
            console.log('Wrong Password')
            res.send('Error: Wrong Email/Password')
        }

    } catch (error) {
        console.log(error)
        res.send('Error')
    }
})

Auth.get('/confirmation/:token', async (req, res) => {
    try {
        const id = jwt.verify(req.params.token, process.env.JWT_SECRET)
        await User.update({ verified: true }, { where: { id } })
    } catch (error) {
        console.log(error)
        res.send('Error')
    }

    res.send("Verification Successful")

})

module.exports = Auth