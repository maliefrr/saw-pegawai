const express = require('express');
const { getKaryawanRegisterPage, postKaryawanRegister } = require('../controller/registerController');
const router = express.Router();

router.get("/karyawan", getKaryawanRegisterPage);
router.get("/user", (req,res) => {
    res.send("user registration")
})


router.post("/karyawan/add", postKaryawanRegister);

module.exports = router;
