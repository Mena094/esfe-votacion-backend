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

const getByCodigo = async (CodigoParticipante, CodigoJuez) => {
  try {
    const queryParticipante = `
    SELECT
    p.Codigo,
    p.Nombre,
    c.Nombre as Categoria
    FROM
        Participante as p
    JOIN
        Categoria as c ON c.Id = p.IdCategoria
    WHERE
        p.Codigo = ? LIMIT 1;
    `

    const queryJuezVoto = `
    SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM Voto as v
            JOIN Participante as p ON v.IdParticipante = p.Id
            JOIN Juez as j ON v.IdJuez = j.Id
            WHERE j.Codigo = '123456' 
                AND p.Codigo = 'fuap'
        ) THEN
            (SELECT Calificacion
             FROM Voto as v
             JOIN Participante as p ON v.IdParticipante = p.Id
             JOIN Juez as j ON v.IdJuez = j.Id
             WHERE j.Codigo = ? 
                 AND p.Codigo = ?)
        ELSE
            NULL
    END as ExistVoto

    `
    const [rowsParticipante] = await pool.query(queryParticipante, [CodigoParticipante]);
    const [rowsJuezVoto] = await pool.query(queryJuezVoto, [CodigoJuez, CodigoParticipante]);
    const participanteValue = rowsParticipante[0] || null;
    const juezVotoValue = rowsJuezVoto[0] || null;
    return {
      data: participanteValue,
      preVoto: juezVotoValue.ExistVoto
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

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

const votar = async ({ CodigoJuez, CodigoParticipante, Calificacion }) => {
  if (Calificacion > 5 || Calificacion < 0) return -5;

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

  // Obtener el ID del Juez usando el CodigoJuez
  query = "SELECT Id FROM Juez WHERE Codigo = ?";
  values = [CodigoJuez];
  const [juez] = await pool.query(query, values);

  if (juez.length <= 0) return -1; // No existe juez con el código proporcionado

  const IdJuez = juez[0].Id;

  // Verificar si el participante tiene un voto existente
  query = "SELECT * FROM Voto WHERE IdJuez = ? AND IdParticipante = ?";
  values = [IdJuez, IdParticipante];
  const [existingVote] = await pool.query(query, values);

  if (existingVote.length > 0) {
    // Actualizar el voto existente en lugar de devolver -3
    query = "UPDATE Voto SET Calificacion = ? WHERE Id = ?";
    values = [Calificacion, existingVote[0].Id];
    await pool.query(query, values);

    return {
      success: "Voto actualizado",
      Nombre: Nombre,
      Calificacion: Calificacion
    };
  }

  // Insertar el nuevo voto si no existe un voto previo
  query = "INSERT INTO Voto (IdJuez, IdParticipante, Calificacion) VALUES (?,?,?)";
  values = [IdJuez, IdParticipante, Calificacion];
  const [voto] = await pool.query(query, values);

  return {
    success: "Nuevo voto agregado",
    Nombre: Nombre,
    Calificacion: Calificacion
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
  getByCodigo
  
}