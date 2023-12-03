const jwt = require("jsonwebtoken");

const verifyTokenAdmin = (req, res, next) => {
  if (req.method === "GET"){
    next()
    return;
  };
  console.log(req.path)
  if (req.path === "/auth" || req.path === "/auth/juez" || req.path === "/participante/voto"){
    next()
    return
  } 
  
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== undefined && typeof bearerHeader === 'string') {
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, "usercred", (error, authData) => {
      if (error) {
        res.status(403).json({ error: 'Token inválido' });
      } else {
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'Token no proporcionado' });
  }
};

const verifyTokenJuez = (req, res, next) =>{
  const bearerHeader = req.headers['authorization'];
  const codigo = req.headers['codigo'];
  console.log("test")
  console.log({codigo, bearerHeader})
  if (typeof bearerHeader !== undefined && typeof bearerHeader === 'string') {
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, codigo, (error, authData) => {
      if (error) {
        res.status(403).json({ error: 'Token inválido' });
      } else {
        req.IdJuez = authData.resul.Id
        next();
      }
    });
  } else {
    res.status(403).json({ error: 'Token no proporcionado' });
  }
}

module.exports = {
  verifyTokenAdmin,
  verifyTokenJuez,
}