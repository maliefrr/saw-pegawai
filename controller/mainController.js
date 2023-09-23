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
        const criteria = [
          {
            name: "Pendidikan",
            weights: {
              D3: 0.2,
              S1: 0.3,
            },
          },
          {
            name: "Skills",
            weights: {
              "jaw crusher": 0.05,
              "hammer mill": 0.05,
              "roller crusher": 0.05,
              "rotary sample divider": 0.05,
              pulvilizer: 0.05,
              "raymond mill": 0.05,
              "disc mill": 0.05,
              dryingshed: 0.05,
              "oven mineral": 0.05,
              "oven astm": 0.05,
            },
          },
        ];

        const candidates = await CalonPegawai.findAll();

        const sortedCandidates = candidates.map((candidate) => {
          const totalWeightedScore = criteria.reduce((sum, criterion) => {
            if (criterion.name === "Pendidikan") {
              const educationLevel = candidate.pendidikan_terakhir;
              return sum + (criterion.weights[educationLevel] || 0);
            } else if (criterion.name === "Skills") {
              const candidateSkills = JSON.parse(candidate.skills);
              
              const skillWeightedScore = candidateSkills.reduce(
                (skillSum, skill) => {
                  if (typeof skill.name === "string") {
                    return skillSum + (criterion.weights[skill.name.toLowerCase()] || 0);
                  } else {
                    return skillSum;
                  }
                },
                0
              );
              return sum + skillWeightedScore;
            } else {
              return sum;
            }
          }, 0);
          return {
            nama: candidate.nama,
            totalWeightedScore: totalWeightedScore,
          };
        });

        // Sort candidates in descending order based on totalWeightedScore
        sortedCandidates.sort(
          (a, b) => b.totalWeightedScore - a.totalWeightedScore
        );

        console.log(sortedCandidates);

        res.render("hasilSAW", {
          error: req.flash("error"),
          success: req.flash("success"),
          result: sortedCandidates,
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