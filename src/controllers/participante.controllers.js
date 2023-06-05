const db = require("../models/participante.models")

const readItems = async (req, res) => {
  const resul = await db.readItems()
  if (resul === 0) {
    res.status(500).json({ error: "Database error" })
  } else {
    res.status(201).json(resul)
  }
}

const createItem = async (req, res) => {
  const resul = await db.createItem(req.body)
  if (resul === 0) {
    res.status(500).json({ error: "Database error" })
  } else if (resul === -1) {
    res.status(409).json({ error: "Ya existe" })
  } else if (resul === -2) {
    res.status(409).json({ error: "No existe Participante" })
  }
  else {
    res.json(resul)
  }
}

const updateItem = async (req, res) => {
  const resul = await db.updateItem(req.body)
  if (resul === 0) {
    res.status(500).json({ error: "Database error" })
  } else if (resul === -2) {
    res.status(404).json({ error: "No existe" })
  }
  else {
    res.json(resul)
  }
}

const deleteItem = async (req, res) => {
  const resul = await db.deleteItem(req.params.Id)
  if (resul === 0) {
    res.status(500).json({ error: "Database error" })
  } else if (resul === -2) {
    res.status(404).json({ error: "No existe" })
  }
  else {
    res.status(204).end()
  }
}

// leer votos
const readVotoById = async (req, res) => {
  const Id = req.params.Id
  if( Id === undefined) {
    res.status(500).json({ error: "Database error" })
    return;
  } 
  const resul = await db.readVotoById(Id)
  if (resul === 0) {
    res.status(500).json({ error: "Database error" })
  } else {
    res.status(201).json(resul)
  }
}
//votar
const votar = async (req, res) => {
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
  const resul = await db.votar( {Codigo, IdAnio, IdCarrera, IdParticipante } )

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
  readItems,
  readVotoById,
  createItem,
  updateItem,
  deleteItem,
  votar
}