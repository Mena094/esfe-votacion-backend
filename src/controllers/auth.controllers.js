const authAdmin = require("../shared/helpers/authAdmin")
const jwt = require("jsonwebtoken")

const getAuth = (req, res) => {
  const credencial = req.body
  const resul = authAdmin(credencial)
  if (resul) {

    jwt.sign({ credencial }, 'usercred', { expiresIn:"7 days" }, (err, token) => {
      res.json({ token })
    })

  } else {
    res.status(401).json({ error: "contraseña invalida" })
  }
}

module.exports = {
  getAuth
}