const pool = require("../shared/config/db.js")

const votar = async ({ Codigo, IdAnio, IdCarrera, IdParticipante }) => {

  //Verificar Existe Estudiante
  let query = "SELECT * FROM Estudiante WHERE Codigo = ? AND IdAnio = ? AND IdCarrera = ?"
  let values = [Codigo, IdAnio, IdCarrera]
  const [estudiante] = await pool.query(query, values);

  if (estudiante.length <= 0)return -1; // No existe estudiante
  
  // Obtener Id Estudiante
  const IdEstudiante = estudiante[0].Id

  // Verificar Existe Participante
  query = "SELECT * FROM Participante WHERE Id = ?"
  values = [IdParticipante]
  const [participante] = await pool.query(query, values);

  if (participante.length <= 0) return -2; // No existe Participante

  // VERIFICAR VOTO EN CATEGORIA Y AGREGAR SI EXISTE
  query = "SELECT * FROM Voto WHERE IdEstudiante = ? AND IdParticipante = ?"
  values = [IdEstudiante, IdParticipante]
  const [exist] = await pool.query(query, values);

  if (exist.length > 0) return -3; // Categoria con el mismo nombre ya existe

  query = "INSERT INTO Voto (IdEstudiante, IdParticipante) VALUES (?,?)"
  const [voto] = await pool.query(query, values);
  return {
    success: "nuevo voto agregado"
  }

}

module.exports = {
  votar
}