const express = require("express")
const { getDashboardPages, getLoginPages, login, getResult, logout, deleteCalonPegawai } = require("../controller/mainController")
const router = express.Router()



router.get("/", getDashboardPages)
router.get("/hasil", getResult)


router.get("/login", getLoginPages)

router.post("/login", login)
router.post("/logout", logout)

router.delete("/delete/:id", deleteCalonPegawai)


module.exports = router