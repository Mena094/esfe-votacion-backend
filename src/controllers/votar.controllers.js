const db = require("../models/votar.models")

const votar = async (req, res) => {
  
  const resul = await db.votar(req.objectData)

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