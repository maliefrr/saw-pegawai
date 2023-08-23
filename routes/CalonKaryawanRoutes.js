const router = require('express').Router()


router.get("/", (req,res) => {
    res.render("registrasiKaryawan")
})



module.exports = router