const jwt = require("jsonwebtoken")
const {user, CalonPegawai, Penilaian} = require("../models")
const bcrypt = require("bcrypt")
const { where } = require("sequelize")


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

const penilaian = async (req,res) => {
  const dataCalon = await CalonPegawai.findAll({
    where : {
      id : req.params.id
    }
  }
  )
  res.render("penilaian",{
      error : req.flash("error"),
      success : req.flash("success"),
      nama : dataCalon[0].dataValues.nama,
      id : dataCalon[0].dataValues.id
  })
}

const postPenilaian = async (req,res) => {
  try {
    const data = await Penilaian.create({
      id_calon : req.body.id_calon,
      pendidikan : req.body.pendidikan,
      pengalaman : req.body.pengalaman,
      wawancara : req.body.wawancara,
      keahlian: req.body.keahlian,
      usia : req.body.usia
    })
    console.log(data)
    req.flash("success", "Data penilaian berhasil tersimpan")
    res.redirect("/")
    
  } catch (error) {
    req.flash("error","Pegawai sudah diberi nilai")
    res.redirect("/")
  }
}

const getResult = async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    req.flash("error", "You must log in first");
    res.redirect("/login");
  } else {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        req.flash("error", err.message);
        console.error("Token expired or invalid:", err.message);
        res.redirect("/login");
      } else {
        const criteria = {
          'Penilaian.pendidikan': 30,
          'Penilaian.pengalaman': 25,
          'Penilaian.wawancara': 20,
          'Penilaian.keahlian': 15,
          'Penilaian.usia': 10
        };

        // Fetch candidates with their attributes and Penilaian
        const candidates = await CalonPegawai.findAll({
          include: [Penilaian],
          attributes: ['nama'],
          raw: true
        });

        // Calculate the total score for each candidate
        candidates.forEach(candidate => {
          candidate.totalScore = 0;
          console.log(candidate)
          for (const key in criteria) {
            console.log(key)
            if (key in candidate) {
              const score = (candidate[key] / 5) * criteria[key];
              candidate.totalScore += score;
            }
          }
        });

        // Sort candidates in descending order based on totalScore
        candidates.sort((a, b) => b.totalScore - a.totalScore);

        // Log the sorted candidates
        console.log(candidates);

        res.render("hasilSAW", {
          error: req.flash("error"),
          success: req.flash("success"),
          result: candidates // Pass the sorted candidates to your view
        });
      }
    });
  }
};





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

const deleteCalonPegawai = (req,res) => {
  const findData = CalonPegawai.findAll({
    where: {
        id : req.params.id
    }
  })
  if(!findData) {
    console.error("data not found")
    res.redirect("/")
  } else {
    const data = CalonPegawai.destroy({
      where: {
        id : req.params.id
      }
    })
    req.flash("success","Data berhasil dihapus")
    res.redirect("/")
  }
}

const logout = (req,res) => {
  res.clearCookie("authToken");
  req.flash("success", "Berhasil Logout")
  res.redirect("/login")
}




module.exports = { getDashboardPages , getLoginPages, login, getResult, logout, deleteCalonPegawai, penilaian, postPenilaian}