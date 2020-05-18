const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const Auth = require("./Routes/Auth");
const Verify = require("./Routes/Verify");

require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", Auth);
app.use("/verify", Verify);

// Sending every other request to react 
app.use(express.static(path.resolve(__dirname, 'build')))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
