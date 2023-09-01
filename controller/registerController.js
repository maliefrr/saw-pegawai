const {CalonPegawai} = require("../models")
const bcrypt = require('bcrypt');
const {user} = require("../models")
const jwt = require("jsonwebtoken")


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
        const {nama,alamat,tgl_lahir,tempat_lahir,pendidikan_terakhir,skill} = req.body
        console.log(req.body)
        if(!nama || !alamat || !tgl_lahir || !tempat_lahir || !pendidikan_terakhir || !skill){
            req.flash("error","Form tidak boleh kosong")
            res.redirect("/register/karyawan")
        } else {
            const data = await CalonPegawai.create({
                nama: nama,
                alamat: alamat,
                tgl_lahir: tgl_lahir,
                tempat_lahir: tempat_lahir,
                pendidikan_terakhir: pendidikan_terakhir,
                skills: skill
            });
    
            req.flash("success", "Selamat Kamu Telah berhasil mendaftar")
            console.log(`Data has been successfully added to database:`, data);
            res.redirect("/login");
        }
    } catch (error) {
        console.error("Error adding data to the database:", error);
        req.flash("error", "Terjadi Kesalahan saat menambahkan data ke database")
        res.status(500).send("An error occurred while adding data.");
    }
}

const postUserRegister = async (req,res) => {
    try {
        if(req.body.password !== req.body.passwordConfirmation){
            req.flash("error","password dan konfirmasi password tidak sesuai")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(req.body.password,salt)
            const data = await user.create({
                username : req.body.username,
                password: hashPassword
            })
            const token = jwt.sign({ user: data.id }, process.env.SECRET, {expiresIn : 24 * 60 * 60});
            res.cookie("authToken", token);
        }
        req.flash("success", "Data berhasil ditambahkan kedalam database")
        res.redirect("/register/user")
    } catch (error) {
        console.error(error)
        req.flash("error",error)
        res.redirect("/register/user")
    }
}


module.exports = {getKaryawanRegisterPage, postKaryawanRegister, postUserRegister, getUserRegisterPage}