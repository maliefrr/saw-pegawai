const jwt = require("jsonwebtoken")
const {user, CalonPegawai} = require("../models")
const bcrypt = require("bcrypt")


const getDashboardPages = (req,res) => {
    const token = req.cookies.authToken
    if(!token) {
        req.flash("error","You Must login first")
        res.redirect("/login")
    }else {
        jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
              // Token has expired or is invalid
              req.flash("error",err.message)
              console.error('Token expired or invalid:', err.message);
              res.redirect("/login")
            } else {
              
                const dataCalonPegawai = await CalonPegawai.findAll()

              res.render("dashboard",{
                error : req.flash("error"),
                success : req.flash("success"),
                calonPegawai : dataCalonPegawai
              })
            }
          }); 
    }
}

const getLoginPages =  (req,res) => {
    res.render("login", {
        error : req.flash("error"),
        success : req.flash("success")
    })
}

const login = async (req,res) => {
    const {username, password} = req.body
    const data = await user.findAll({
        where: {
            username
        }
    })
    if(data.length === 0) {
        req.flash("error","Username atau password tidak valid")
        res.redirect("/login")
    } else {
        const verifyPassword = await bcrypt.compare(password,data[0]["dataValues"]["password"])
        if(!verifyPassword) {
            req.flash("error","Username atau password tidak valid")
            res.redirect("/login")
        } else {
            const token = jwt.sign({ user: data[0]['dataValues']['id'] }, process.env.SECRET);
            res.cookie('authToken', token);
            res.redirect("/")
        }
    }
}


module.exports = { getDashboardPages , getLoginPages, login}