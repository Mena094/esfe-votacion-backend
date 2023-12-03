const pool = require("../shared/config/db.js");

const votar = async ({ Codigo, IdParticipante }) => {
  try {
    // Verificar Existe Juez
    const [juez] = await pool.execute("SELECT * FROM Juez WHERE Codigo = ?", [Codigo]);

    if (juez.length <= 0) return -1; // No existe Juez

    // Obtener Id Juez
    const IdJuez = juez[0].Id;

    // Verificar Existe Participante
    const [participante] = await pool.execute("SELECT * FROM Participante WHERE Id = ?", [IdParticipante]);

    if (participante.length <= 0) return -2; // No existe Participante

    // Verificar Voto en Categoría y Agregar si Existe
    const [exist] = await pool.execute("SELECT * FROM Voto WHERE IdJuez = ? AND IdParticipante = ?", [IdJuez, IdParticipante]);

    if (exist.length > 0) return -3; // Voto ya existe

    await pool.execute("INSERT INTO Voto (IdJuez, IdParticipante) VALUES (?, ?)", [IdJuez, IdParticipante]);
    
    return {
      success: "Nuevo voto agregado"
    };
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    return -4; // Manejo de errores
  }
};

module.exports = {
  votar
};
