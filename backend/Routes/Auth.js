import { Router } from 'express'

const Auth = Router()

const User = require('../Models/User')


Auth.post('/register', async(req, res) => {

    let userExists = await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if (userExists) {
        res.send("User already exists")
    } else {

        let checkOfficialEmail = /@vit\.edu\.in$/g

        if(!req.body.email.match(checkOfficialEmail)){
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
            res.send("Success: Registration successful")

        } catch (error) {
            console.log(error)
            res.send("Error")
        }
    }

})