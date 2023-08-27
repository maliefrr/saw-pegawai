const express = require("express")
const session = require("express-session");
const flash = require('connect-flash');
const cookieParser = require("cookie-parser");
const app = express()
const bodyParser = require('body-parser')

require("dotenv").config()
require("./models/index")


// middleware
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

// setting up session
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: false
    })
)

app.use(cookieParser(process.env.SECRET));
app.use(flash());

// load routes
app.use("/", require("./routes/mainRoutes"))
app.use("/register", require("./routes/registerRoutes"))

const port = process.env.PORT || 3000


app.listen(port, () => console.log(`App is listening to port ${port}`))