const authAdmin = require("../shared/helpers/authAdmin")
const jwt = require("jsonwebtoken")
const bd = require("../models/auth.models")


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

const verifyAuth = (req,res) =>{
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== undefined && typeof bearerHeader === 'string') {
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, "usercred", (error, authData) => {
      if (error) {
        res.status(403).json({ error: 'Token inválido' });
      } else {
        res.json({ succes: 'Verificado' }).status(202);
      }
    });
  } else {
    res.status(403).json({ error: 'Token no proporcionado' });
  }
}

const getAuthEstudiante =async (req, res) => {
  const { Codigo, IdAnio, IdCarrera } = req.body
  const datos = { Codigo, IdAnio, IdCarrera }
  const resul = await bd.authEstudiante(datos)
  if (resul !== false) {
    jwt.sign({ resul }, resul.Codigo, (err, token) => {
      res.json({ token, codigo:resul.Codigo })
    })

  } else {
    res.status(401).json({ error: "datos invalidos" })
  }
}
module.exports = {
  getAuth,
  verifyAuth,
  getAuthEstudiante
}