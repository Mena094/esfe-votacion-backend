const pool = require("../shared/config/db.js")

const readItems = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM Concurso")
    return rows
  } catch (e) {
    console.error(e)
    return 0
  }
}

const readCategoriaById = async (Id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Categoria WHERE IdConcurso = ?", [Id])
    return rows
  } catch (e) {
    console.error(e)
    return 0
  }
}

const createItem = async ({ Nombre, Descripcion, Activo, Tipo }) => {
  try {
    const [exist] = await pool.query("SELECT * FROM Concurso WHERE Nombre = ?", [Nombre]);
    if (exist.length > 0) return -1; // Concurso con el mismo nombre ya existe

    const query = "INSERT INTO Concurso (Nombre, Descripcion, Activo, Tipo) VALUES (?, ?, ?, ?)";
    const values = [Nombre, Descripcion, Activo, Tipo];
    const [rows] = await pool.query(query, values);

    return {
      Id: rows.insertId,
      Nombre, Descripcion, Activo, Tipo
    };
  } catch (e) {
    console.error(e);
    return 0; // Error en la operación
  }
};

const updateItem = async ({ Id, Nombre, Descripcion, Activo, Tipo }) => {
  try {
    let query = `
      UPDATE Concurso 
      SET Nombre = ?, Descripcion = ?, Activo = ?, Tipo = ? 
      WHERE Id = ?
      `
    const values = [Nombre, Descripcion, Activo, Tipo, Id];
    const [result] = await pool.query(query, values)
    console.log(result)

    if (result.affectedRows === 0) return -2
    const [rows] = await pool.query("SELECT * FROM Concurso WHERE Id = ?", [Id])
    return rows[0]; // Devuelve el resultado de la actualización

  } catch (e) {
    console.error(e);
    return 0;
  }
};

const deleteItem = async (id) => {
  try {
    const query = "DELETE FROM Concurso WHERE Id = ?";
    const [result] = await pool.query(query, [id]);
    if (result.affectedRows === 0) return -2

    return 1; // Devuelve el resultado de la eliminación
  } catch (e) {
    console.error(e);
    return 0;
  }
};

module.exports = {
  readItems,
  readCategoriaById,
  createItem,
  updateItem,
  deleteItem
}