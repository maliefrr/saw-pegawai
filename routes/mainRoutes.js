const express = require("express")
const { getDashboardPages, getLoginPages, login, getResult, logout } = require("../controller/mainController")
const router = express.Router()



router.get("/", getDashboardPages)
router.get("/hasil", getResult)


router.get("/login", getLoginPages)

router.post("/login", login)
router.post("/logout", logout)


module.exports = router