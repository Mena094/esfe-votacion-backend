const pool = require("../shared/config/db.js")

const readItems = async () =>{
  try{
    const [rows] = await pool.query("SELECT * FROM Categoria")
    return rows
  }catch(e){
    console.error(e)
    return 0
  }
}

const createItem = async ({ Nombre, Descripcion, IdConcurso }) => {
  try {
    const [exist] = await pool.query("SELECT * FROM Categoria WHERE Nombre = ?", [Nombre]);
    if (exist.length > 0) {
      return -1; // Categoria con el mismo nombre ya existe
    }
    const [concurso] = await pool.query("SELECT * FROM Concurso WHERE Id = ?", [IdConcurso]);
    if (concurso.length < 1) {
      return -2; // Categoria con el mismo nombre ya existe
    }
    const query = "INSERT INTO Categoria (Nombre, Descripcion, IdConcurso) VALUES (?, ?, ?)";
    const values = [Nombre, Descripcion, IdConcurso];
    const [rows] = await pool.query(query, values);

    return {
      Id:rows.insertId,
      Nombre, Descripcion, IdConcurso
    };

  } catch (e) {
    console.error(e);
    return 0; // Error en la operación
  }
};

const updateItem = async (body) => {
  try {
    const { Id, Nombre, Descripcion, IdConcurso } = body;

    const query = "UPDATE Categoria SET Nombre = ?, Descripcion = ?, IdConcurso = ? WHERE Id = ?";
    const values = [Nombre, Descripcion, IdConcurso, Id];
    const [result] = await pool.query(query, values)

    if(result.changedRows  === 0) return -2
    const [rows] = await pool.query("SELECT * FROM Categoria WHERE Id = ?", [Id])
    return rows; // Devuelve el resultado de la actualización

  } catch (e) {
    console.error(e);
    return 0; 
  }
};

const deleteItem = async (id) => {
  try {
    const query = "DELETE FROM Categoria WHERE Id = ?";
    const [result] = await pool.query(query, [id]);
    if(result.affectedRows === 0) return -2

    return 1; // Devuelve el resultado de la eliminación

  } catch (e) {
    console.error(e);
    return 0; 
  }
};


module.exports = {
  readItems,
  createItem,
  updateItem,
  deleteItem
}