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
    const [rows] = await pool.query("SELECT COUNT(*) as Total FROM Voto WHERE IdParticipante = ?",[Id])
    return rows[0]
  }catch(e){
    console.error(e)
    return 0
  }
}

const createItem = async ({ IdEstudiante, IdCategoria }) => {
  try {
    let query = "SELECT * FROM Participante WHERE IdEstudiante = ?"
    const [exist] = await pool.query(query, [IdEstudiante, IdCategoria]);
    if (exist.length > 0) return -1; // Participante con el mismo IdEstudiante ya existe
    
    const [categoria] = await pool.query("SELECT * FROM Categoria WHERE Id = ?", [IdCategoria]);
    if (categoria.length < 1) return -2; // No existe categoria
    
    const IdConcurso = categoria[0].IdConcurso
    const [concurso] = await pool.query("SELECT * FROM Concurso WHERE Id = ?", [IdConcurso]);
    if (concurso.length < 1) return -2; // No existe categoria

    query = "INSERT INTO Participante (IdEstudiante, IdCategoria) VALUES (?, ?)";
    const values = [IdEstudiante, IdCategoria];
    const [rows] = await pool.query(query, values);

    if(concurso[0].Tipo === "puntaje"){
      query = "INSERT INTO Puntaje (IdParticipante, Puntaje) VALUES (?, ?)";
      const values = [rows.insertId, 0];
      const [result] = await pool.query(query, values);
      console.log(result)
    }

    return {
      Id:rows.insertId,
      IdEstudiante, IdCategoria
    };
  } catch (e) {
    console.error(e);
    return 0; // Error en la operación
  }
};

const updateItem = async (body) => {
  try {
    const { Id, IdEstudiante,IdCategoria } = body;

    let query = "UPDATE Participante SET IdEstudiante = ?, IdCategoria = ? WHERE Id = ?";
    const values = [IdEstudiante, IdCategoria, Id];
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


const verificarConcursoActivo = async (IdCategoria) => {
  const query = `
    SELECT Estado
    FROM Concurso
    WHERE Id IN (
      SELECT IdConcurso
      FROM Categoria
      WHERE Id = ?
    )
  `;
  const [result] = await pool.query(query, [IdCategoria]);
  return result.length > 0 && result[0].Estado === 'iniciado';
};

const votar = async ({ IdEstudiante, CodigoParticipante }) => {
  // Verificar la existencia del participante
  let query = `
    SELECT P.Id, P.IdCategoria, P.Nombre
    FROM Participante P
    WHERE P.Codigo = ?
  `;
  let values = [CodigoParticipante];
  const [participante] = await pool.query(query, values);

  if (participante.length <= 0) return -2; // No existe participante

  const IdParticipante = participante[0].Id;
  const IdCategoria = participante[0].IdCategoria;
  const Nombre = participante[0].Nombre;

  // Verificar si el concurso está activo
  const concursoActivo = await verificarConcursoActivo(IdCategoria);
  if (!concursoActivo) {
    return -4; // Concurso no activo
  }

  // Verificar si el participante tiene un voto existente
  query = "SELECT * FROM Voto WHERE IdEstudiante = ? AND IdParticipante = ?";
  values = [IdEstudiante, IdParticipante];
  const [exist] = await pool.query(query, values);

  if (exist.length > 0) return -3; // Voto existente para el participante

  // Insertar el nuevo voto
  query = "INSERT INTO Voto (IdEstudiante, IdParticipante) VALUES (?,?)";
  values = [IdEstudiante, IdParticipante];
  const [voto] = await pool.query(query, values);
  console.error("as" +  Nombre)
  return {
    success: "Nuevo voto agregado",
    Nombre:Nombre
  };
};


module.exports = {
  puntaje,
  readItems,
  readVotoById,
  votar,
  createItem,
  updateItem,
  deleteItem,
  
}