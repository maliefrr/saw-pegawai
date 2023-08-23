const express = require("express")
const app = express()
require("dotenv").config()

// middleware
app.set("view engine", "ejs")
app.use(express.static("public"))

app.use("/register/karyawan", require("./routes/CalonKaryawanRoutes"))

const port = process.env.PORT || 3000


app.listen(port, () => console.log(`App is listening to port ${port}`))