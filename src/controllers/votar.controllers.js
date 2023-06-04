const db = require("../models/votar.models")

const votar = async (req, res) => {
  const { Codigo, IdAnio, IdCarrera, IdParticipante } = req.body
  if (Codigo === undefined || IdAnio === undefined || IdCarrera === undefined ||
    IdParticipante === undefined) {
    res.status(409).json({ error: "Datos invalidos" })
    return
  }

  const resul = await db.votar({ Codigo, IdAnio, IdCarrera, IdParticipante })

  if (resul === -1) {
    res.status(409).json({ error: "No existe estudiante con codigo: " + Codigo })
  }
  else if (resul === -2) {
    res.status(409).json({ error: "No existe participante con id: " + IdParticipante })
  }
  else if (resul === -3) {
    res.status(409).json({ error: "Ya votaste por este participante" })
  }
  else {
    res.json(resul)
  }
}

module.exports = {
  votar
}