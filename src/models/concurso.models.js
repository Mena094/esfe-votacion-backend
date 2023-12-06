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
    const query = `
      SELECT 
        C.Id AS CategoriaId,
        C.Nombre AS Nombre,
        C.Descripcion AS Descripcion,
        C.IdConcurso AS IdConcurso,
        P.Id AS ParticipanteId, 
        P.Nombre AS ParticipanteNombre,
        P.Codigo AS ParticipanteCodigo,
        COUNT(V.Id) AS ConteoVotos,
        SUM(V.Calificacion) AS SumaCalificaciones,
        AVG(V.Calificacion) AS PromedioCalificacion,
        Pt.Puntaje AS Puntuacion
      FROM Categoria C
      LEFT JOIN Participante P ON C.Id = P.IdCategoria
      LEFT JOIN Voto V ON P.Id = V.IdParticipante
      LEFT JOIN Puntaje Pt ON P.Id = Pt.IdParticipante
      WHERE C.IdConcurso = ?
      GROUP BY C.Id, P.Id, Pt.Id
    `;

    const [result] = await pool.query(query, [Id]);

    const categories = [];

    result.forEach((row) => {
      const categoryIndex = categories.findIndex((c) => c.CategoriaId === row.CategoriaId);

      if (categoryIndex === -1) {
        const category = {
          CategoriaId: row.CategoriaId,
          Nombre: row.Nombre,
          Descripcion: row.Descripcion,
          IdConcurso: row.IdConcurso,
          Participantes: [],
        };

        if (row.ParticipanteId) {
          const participant = {
            Id: row.ParticipanteId,
            Nombre: row.ParticipanteNombre,
            Codigo: row.ParticipanteCodigo,
          };

          if (row.ConteoVotos !== null) {
            participant.ConteoVotos = row.ConteoVotos;
          }

          if (row.SumaCalificaciones !== null) {
            participant.SumaCalificaciones = row.SumaCalificaciones;
          }

          if (row.PromedioCalificacion !== null) {
            participant.PromedioCalificacion = row.PromedioCalificacion;
          }

          if (row.Puntuacion !== null) {
            participant.Puntuacion = row.Puntuacion;
          }

          category.Participantes.push(participant);
        }

        categories.push(category);
      } else {
        const participant = {
          Id: row.ParticipanteId,
          Nombre: row.ParticipanteNombre,
          Codigo: row.ParticipanteCodigo,
        };

        if (row.ConteoVotos !== null) {
          participant.ConteoVotos = row.ConteoVotos;
        }

        if (row.SumaCalificaciones !== null) {
          participant.SumaCalificaciones = row.SumaCalificaciones;
        }

        if (row.PromedioCalificacion !== null) {
          participant.PromedioCalificacion = row.PromedioCalificacion;
        }

        if (row.Puntuacion !== null) {
          participant.Puntuacion = row.Puntuacion;
        }

        categories[categoryIndex].Participantes.push(participant);
      }
    });

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