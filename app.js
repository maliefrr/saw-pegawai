const app = require("express")()
require("dotenv").config()


const port = process.env.PORT || 3000


app.listen(() => console.log(`App is listening to port ${port}`))