const express = require("express")
const app = express()
const bodyParser = require('body-parser')

require("dotenv").config()
require("./models/index")


// middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/register", require("./routes/registerRoutes"))

const port = process.env.PORT || 3000


app.listen(port, () => console.log(`App is listening to port ${port}`))