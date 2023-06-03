const db = require("../models/categoria.models")

const getItems = async (req,res)=>{
  const resul = await db.getItems()
  if(resul === false){
    res.status(500).json({error:"db error"})
  }else{
    res.json(resul)
  }
}

module.exports = {
  getItems
}