const db = require("../models/estadistica.models")

const getAll = async (req, res) => {
  const { Id } = req.body
  const resul = await db.getAll(Id)
  res.json(resul)
}

const getCarrera =async (req, res) => {
  try {
    const carreras = ["TIDS", "TIE", "TM", "TGDT"];
    const votosPorCarrera = await db.getCarrera(carreras);

    // Aquí puedes hacer algo con los resultados, como enviarlos como respuesta JSON
    res.json(votosPorCarrera);
  } catch (error) {
    console.error(error);
    // Aquí puedes manejar el error de alguna manera adecuada
    res.status(500).json({ error: 'Error en el servidor' });
  }
}
module.exports = {
  getAll,
  getCarrera
}