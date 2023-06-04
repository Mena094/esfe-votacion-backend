const pool = require("../config/db");

const verifyActive = async (req, res, next) => {
  const { Codigo, IdAnio, IdCarrera, IdParticipante } = req.body;

  if (
    Codigo === undefined ||
    IdAnio === undefined ||
    IdCarrera === undefined ||
    IdParticipante === undefined
  ) {
    res.status(409).json({ error: "Datos inválidos" });
    return;
  }

  req.objectData = { Codigo, IdAnio, IdCarrera, IdParticipante };

  try {
    const categoriaQuery = `
      SELECT IdConcurso
      FROM Categoria
      WHERE Id = (
        SELECT IdCategoria
        FROM Participante
        WHERE Id = ?
        LIMIT 1
      )
      LIMIT 1
    `;
    const [categoriaRows] = await pool.query(categoriaQuery, [IdParticipante]);

    if (categoriaRows.length === 0) {
      res.status(404).json({ error: "Participante no encontrado" });
      return;
    }

    const { IdConcurso } = categoriaRows[0];

    const concursoActivoQuery = `
      SELECT Activo
      FROM Concurso
      WHERE Id = ?
      LIMIT 1
    `;
    const [concursoActivoRows] = await pool.query(concursoActivoQuery, [
      IdConcurso,
    ]);

    if (concursoActivoRows.length === 0) {
      res.status(404).json({ error: "Concurso no encontrado" });
      return;
    }

    const { Activo } = concursoActivoRows[0];

    if (!Activo) {
      res.status(403).json({ error: "El concurso no está activo" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error al verificar el estado del concurso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
