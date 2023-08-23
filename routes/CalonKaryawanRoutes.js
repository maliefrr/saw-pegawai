const express = require('express')
const router = express.Router()


router.get("/", (req,res) => {
    res.render("registrasiKaryawan")
})

router.post("/add", (req,res) => {
    console.log(req.body)
    res.redirect("/register/karyawan")
})


module.exports = router