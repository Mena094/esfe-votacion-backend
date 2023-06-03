const pool = require("../shared/config/db.js")

const readItems = async () =>{
  try{
    const [rows] = await pool.query("SELECT * FROM Concurso")
    return rows
  }catch(e){
    console.error(e)
    return 0
  }
}

const createItem = async ({ Nombre, Descripcion, Inicio, Fin }) => {
  try {
    const [exist] = await pool.query("SELECT * FROM Concurso WHERE Nombre = ?", [Nombre]);
    if (exist.length > 0) {
      return -1; // Concurso con el mismo nombre ya existe
    }
    const query = "INSERT INTO Concurso (Nombre, Descripcion, Inicio, Fin) VALUES (?, ?, ?, ?)";
    const values = [Nombre, Descripcion, Inicio, Fin];
    const [rows] = await pool.query(query, values);

    return {
      Id:rows.insertId,
      Nombre, Descripcion, Inicio, Fin
    };

  } catch (e) {
    console.error(e);
    return 0; // Error en la operación
  }
};

const updateItem = async (body) => {
  try {
    const { Id, Nombre, Descripcion, Inicio, Fin } = body;

    const query = "UPDATE Concurso SET Nombre = ?, Descripcion = ?, Inicio = ?, Fin = ? WHERE Id = ?";
    const values = [Nombre, Descripcion, Inicio, Fin, Id];
    const [result] = await pool.query(query, values)

    if(result.changedRows  === 0) return -2
    const [rows] = await pool.query("SELECT * FROM Concurso WHERE Id = ?", [Id])
    return rows[0]; // Devuelve el resultado de la actualización

  } catch (e) {
    console.log("**** FALLOOOO ****")
    console.error(e);
    return 0; 
  }
};

const deleteItem = async (id) => {
  try {
    const query = "DELETE FROM Concurso WHERE Id = ?";
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