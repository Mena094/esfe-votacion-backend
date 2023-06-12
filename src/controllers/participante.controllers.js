const db = require("../models/participante.models")

const puntaje = async (req, res) => {
  const CodigoParticipante = req.body.Id
  const { Puntaje } = req.body
  const resul = await db.puntaje({Puntaje, CodigoParticipante})
  if (resul === 0) {
    res.status(500).json({ error: "Database error" })
  } else {
    res.status(204).json({success:`puntaje asignado`})
  }
}
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
    res.status(409).json({ error: "No existe Categoria" })
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
    res.status(202).json({success:`participante ${req.params.Id} eliminado`})
  }
}

// leer votos
const readVotoById = async (req, res) => {
  const Id = req.body.Id
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
  const { IdEstudiante } = req;
  const {CodigoParticipante} = req.body;

  console.log({
    IdEstudiante,CodigoParticipante
  })
  if (
    
    IdEstudiante === undefined ||
    CodigoParticipante === undefined
  ) {
    res.status(409).json({ error: "Datos inválidos" });
    return;
  }
  const resul = await db.votar( {IdEstudiante, CodigoParticipante} )

  if (resul === -1) {
    res.status(409).json({ error: "No existe estudiante con estudiante" })
  }
  else if (resul === -2) {
    res.status(409).json({ error: "No existe participante con codigo: " + CodigoParticipante })
  }
  else if (resul === -3) {
    res.status(409).json({ error: "Ya votaste por este participante" })
  }
  else if (resul === -4) {
    res.status(409).json({ error: "Concurso no esta activo" })
  }
  else {
    res.json(resul)
  }
}

module.exports = {
  puntaje,
  readItems,
  readVotoById,
  votar,
  createItem,
  updateItem,
  deleteItem,
}