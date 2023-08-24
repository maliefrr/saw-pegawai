const express = require('express');
const { CalonPegawai } = require('../models'); // Import the model correctly
const router = express.Router();

router.get("/", (req, res) => {
    res.render("registrasiKaryawan");
});

router.post("/add", async (req, res) => {
    try {
        const data = await CalonPegawai.create({
            nama: req.body.nama,
            alamat: req.body.alamat,
            tgl_lahir: req.body.tgl_lahir,
            tempat_lahir: req.body.tempat_lahir,
            pendidikan_terakhir: req.body.pendidikan,
            skills: req.body.skill
        });

        console.log(`Data has been successfully added to database:`, data);
        res.redirect("/register/karyawan");
    } catch (error) {
        console.error("Error adding data to the database:", error);
        res.status(500).send("An error occurred while adding data.");
    }
});

module.exports = router;
