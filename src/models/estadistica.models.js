const pool = require("../shared/config/db.js")

const getAll = async (Id) =>{
  try {
    const query = `
      SELECT c.Id, c.Nombre, c.Descripcion, p.Id AS ParticipanteId, p.Nombre AS ParticipanteNombre, v.Id AS VotoId 
      FROM Categoria c
      LEFT JOIN Participante p ON c.Id = p.IdCategoria
      LEFT JOIN Voto v ON p.Id = v.IdParticipante
      WHERE c.IdConcurso = ?
      
    `;
    const [rows] = await pool.query(query,[Id]);

    const categorias = [];
    let currentCategoria = null;

    for (let row of rows) {
      if (row.Id !== currentCategoria?.Id) {
        currentCategoria = {
          Id: row.Id,
          Nombre: row.Nombre,
          Descripcion: row.Descripcion,
          Participantes: []
        };
        categorias.push(currentCategoria);
      }

      if (row.ParticipanteId) {
        const participante = {
          Id: row.ParticipanteId,
          Nombre: row.ParticipanteNombre,
          Votos: []
        };

        if (row.VotoId) {
          participante.Votos.push({
            Id: row.VotoId
          });
        }

        currentCategoria.Participantes.push(participante);
      }
    }

    return categorias;
  } catch (error) {
    console.error(error);
    return null;
  }
} 

module.exports = {
  getAll
}