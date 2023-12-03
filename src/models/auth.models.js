const pool = require("../shared/config/db.js")

const authJuez = async ({ Codigo }) => {

  //Verificar Existe Estudiante
  let query = "SELECT * FROM Juez WHERE Codigo = ?"
  let values = [Codigo ]
  const [juez] = await pool.query(query, values);

  if (juez.length <= 0) return false; // No existe estudiante
  return juez[0]
  
}

module.exports ={
  authJuez
}