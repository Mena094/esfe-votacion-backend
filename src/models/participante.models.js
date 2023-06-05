const pool = require("../shared/config/db.js")

const puntaje = async ({Puntaje, IdParticipante}) =>{
  try{
    query = "UPDATE Puntaje SET Puntaje = ? WHERE IdParticipante = ?";
    const values = [Puntaje, IdParticipante]
    const [result] = await pool.query(query, values);
    return 1
  }catch(e){
    console.error(e)
    return 0
  }
}
const readItems = async () =>{
  try{
    const [rows] = await pool.query("SELECT * FROM Participante")
    return rows
  }catch(e){
    console.error(e)
    return 0
  }
}

const readVotoById = async (Id) =>{
  try{
    const [rows] = await pool.query("SELECT COUNT(*) as Total FROM Voto WHERE Id = ?",[Id])
    return rows[0]
  }catch(e){
    console.error(e)
    return 0
  }
}

const createItem = async ({ Nombre, IdCategoria }) => {
  try {
    let query = "SELECT * FROM Participante WHERE Nombre = ? AND IdCategoria = ?"
    const [exist] = await pool.query(query, [Nombre, IdCategoria]);
    if (exist.length > 0) return -1; // Participante con el mismo nombre ya existe
    
    const [categoria] = await pool.query("SELECT * FROM Categoria WHERE Id = ?", [IdCategoria]);
    if (categoria.length < 1) return -2; // No existe categoria
    
    const IdConcurso = categoria[0].IdConcurso
    const [concurso] = await pool.query("SELECT * FROM Concurso WHERE Id = ?", [IdConcurso]);
    if (concurso.length < 1) return -2; // No existe categoria

    query = "INSERT INTO Participante (Nombre, IdCategoria) VALUES (?, ?)";
    const values = [Nombre, IdCategoria];
    const [rows] = await pool.query(query, values);

    if(concurso[0].Tipo === "puntaje"){
      query = "INSERT INTO Puntaje (IdParticipante, Puntaje) VALUES (?, ?)";
      const values = [rows.insertId, 0];
      const [result] = await pool.query(query, values);
      console.log(result)
    }

    return {
      Id:rows.insertId,
      Nombre, IdCategoria
    };
  } catch (e) {
    console.error(e);
    return 0; // Error en la operación
  }
};

const updateItem = async (body) => {
  try {
    const { Id, Nombre,IdCategoria } = body;

    let query = "UPDATE Participante SET Nombre = ?, IdCategoria = ? WHERE Id = ?";
    const values = [Nombre, IdCategoria, Id];
    const [result] = await pool.query(query, values)

    if(result.changedRows  === 0) return -2
    const [rows] = await pool.query("SELECT * FROM Participante WHERE Id = ?", [Id])
    return rows[0]; // Devuelve el resultado de la actualización

  } catch (e) {
    console.error(e);
    return 0; 
  }
};

const deleteItem = async (Id) => {
  try {
    const query = "DELETE FROM Participante WHERE Id = ?";
    const [result] = await pool.query(query, [Id]);
    if(result.affectedRows === 0) return -2

    return 1; // Devuelve el resultado de la eliminación
  } catch (e) {
    console.error(e);
    return 0; 
  }
};

//votar
const votar = async ({ Codigo, IdAnio, IdCarrera, IdParticipante }) => {

  //Verificar Existe Estudiante
  let query = "SELECT * FROM Estudiante WHERE Codigo = ? AND IdAnio = ? AND IdCarrera = ?"
  let values = [Codigo, IdAnio, IdCarrera]
  const [estudiante] = await pool.query(query, values);

  if (estudiante.length <= 0) return -1; // No existe estudiante

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
  puntaje,
  readItems,
  readVotoById,
  votar,
  createItem,
  updateItem,
  deleteItem,
  
}