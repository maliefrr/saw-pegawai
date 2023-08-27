const express = require("express")
const { getDashboardPages, getLoginPages, login } = require("../controller/mainController")
const router = express.Router()



router.get("/", getDashboardPages)


router.get("/login", getLoginPages)

router.post("/login", login)



module.exports = router