const express = require('express');
const { getKaryawanRegisterPage, postKaryawanRegister, postUserRegister, getUserRegisterPage } = require('../controller/registerController');
const router = express.Router();

router.get("/karyawan", getKaryawanRegisterPage);
router.get("/user", getUserRegisterPage)


router.post("/karyawan/add", postKaryawanRegister);
router.post("/user/add", postUserRegister)

module.exports = router;
