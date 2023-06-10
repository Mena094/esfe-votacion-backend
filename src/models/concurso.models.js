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
    const [categories] = await pool.query("SELECT * FROM Categoria WHERE IdConcurso = ?",[Id]);

    for (const category of categories) {
      const [participants] = await pool.query(
        "SELECT * FROM Participante WHERE IdCategoria = ?",
        [category.Id]
      );

      // Obtener el tipo de concurso desde el objeto "Concurso" asociado a la categoría
      const [concurso] = await pool.query(
        "SELECT Tipo FROM Concurso WHERE Id = ?",
        [category.IdConcurso]
      );

      // Asignar los participantes a la propiedad "Participantes" de la categoría
      
      for (const participant of participants) {
      
        if (concurso[0].Tipo === "votacion") {
          const [voteCount] = await pool.query(
            "SELECT COUNT(*) AS Count FROM Voto WHERE IdParticipante = ?",
            [participant.Id]
          );
          participant.ConteoVotos = voteCount[0].Count;
        } else if (concurso[0].Tipo === "puntaje") {
          const [score] = await pool.query(
            "SELECT Puntaje FROM Puntaje WHERE IdParticipante = ?",
            [participant.Id]
          );
          participant.Puntaje = score[0].Puntaje;
        }
      }
      category.Participantes = participants;
    }

    return categories;
  } catch (e) {
    console.error(e);
    return [];
  }
};


const createItem = async ({ Nombre, Descripcion, Estado, Tipo }) => {
  try {
    const [exist] = await pool.query("SELECT * FROM Concurso WHERE Nombre = ?", [Nombre]);
    if (exist.length > 0) return -1; // Concurso con el mismo nombre ya existe

    const query = "INSERT INTO Concurso (Nombre, Descripcion, Estado, Tipo) VALUES (?, ?, ?, ?)";
    const values = [Nombre, Descripcion, Estado, Tipo];
    const [rows] = await pool.query(query, values);

    return {
      Id: rows.insertId,
      Nombre, Descripcion, Estado, Tipo
    };
  } catch (e) {
    console.error(e);
    return 0; // Error en la operación
  }
};

const updateItem = async ({ Id, Nombre, Descripcion, Estado, Tipo }) => {
  try {
    let query = `
      UPDATE Concurso 
      SET Nombre = ?, Descripcion = ?, Estado = ?, Tipo = ? 
      WHERE Id = ?
      `
    const values = [Nombre, Descripcion, Estado, Tipo, Id];
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