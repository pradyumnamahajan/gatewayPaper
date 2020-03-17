const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use( bodyParser.urlencoded( {extended: false} ))
app.use( bodyParser.json() )
require('dotenv').config();

let Auth = require("./Routes/Auth")
app.use("/auth", Auth)


let PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})