const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { getAuth } = require("../controllers/auth.controllers")

router.post("/", getAuth)

router.post("/verify", (req, res)=>{
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
})

module.exports = router