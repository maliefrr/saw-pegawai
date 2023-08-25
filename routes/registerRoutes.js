const express = require('express');
const { getKaryawanRegisterPage, postKaryawanRegister, postUserRegister } = require('../controller/registerController');
const router = express.Router();

router.get("/karyawan", getKaryawanRegisterPage);
router.get("/user", (req,res) => {
    res.render("registrasiUser")
})


router.post("/karyawan/add", postKaryawanRegister);
router.post("/user/add", postUserRegister)

module.exports = router;
