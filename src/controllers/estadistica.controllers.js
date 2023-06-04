const db = require("../models/estadistica.models")

const getAll = async (req,res) =>{
  const {Id} = req.body
  const resul = await db.getAll(Id)
  res.json(resul)
}

module.exports = {
  getAll
}