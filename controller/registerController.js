const {CalonPegawai} = require("../models")
const {User} = require("../models")


const getKaryawanRegisterPage = (req, res) => {
    res.render("registrasiKaryawan",{
        error : req.flash("error"),
        success: req.flash("success")
    });
}

const getUserRegisterPage = (req,res) => {
    res.render("registrasiUser",{
        error : req.flash("error"),
        success: req.flash("success")
    })
}

const postKaryawanRegister = async (req, res) => {
    try {
        const data = await CalonPegawai.create({
            nama: req.body.nama,
            alamat: req.body.alamat,
            tgl_lahir: req.body.tgl_lahir,
            tempat_lahir: req.body.tempat_lahir,
            pendidikan_terakhir: req.body.pendidikan,
            skills: req.body.skill
        });

        req.flash("success", "Data berhasil ditambahkan ke database")
        console.log(`Data has been successfully added to database:`, data);
        res.redirect("/register/karyawan");
    } catch (error) {
        console.error("Error adding data to the database:", error);
        req.flash("error", "Terjadi Kesalahan saat menambahkan data ke database")
        res.status(500).send("An error occurred while adding data.");
    }
}

const postUserRegister = (req,res) => {
    req.body.password !== req.body.passwordConfirmation ? req.flash("error","password dan konfirmasi password tidak sesuai") : req.flash("success", "Berhasil menambahkan data ke database")
    res.redirect("/register/user")
}


module.exports = {getKaryawanRegisterPage, postKaryawanRegister, postUserRegister, getUserRegisterPage}