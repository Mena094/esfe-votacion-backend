const pool = require("../shared/config/db.js")

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
    
    const [concurso] = await pool.query("SELECT * FROM Categoria WHERE Id = ?", [IdCategoria]);
    if (concurso.length < 1) return -2; // No existe categoria
    
    query = "INSERT INTO Participante (Nombre, IdCategoria) VALUES (?, ?)";
    const values = [Nombre, IdCategoria];
    const [rows] = await pool.query(query, values);

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

module.exports = {
  readItems,
  readVotoById,
  createItem,
  updateItem,
  deleteItem
}