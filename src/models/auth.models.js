const pool = require("../shared/config/db.js")

const authEstudiante = async ({ Codigo, IdAnio, IdCarrera }) => {

  //Verificar Existe Estudiante
  let query = "SELECT * FROM Estudiante WHERE Codigo = ? AND IdAnio = ? AND IdCarrera = ?"
  let values = [Codigo, IdAnio, IdCarrera]
  const [estudiante] = await pool.query(query, values);

  if (estudiante.length <= 0) return false; // No existe estudiante
  return estudiante[0]
  
}

module.exports ={
  authEstudiante
}