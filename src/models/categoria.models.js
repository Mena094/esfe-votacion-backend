const pool = require("../shared/config/db.js")

const getItems = async () =>{
  try{
    const [rows] = await pool.query("SELECT * FROM Categoria")
    return rows
  }catch(_){
    return false
  }
}

module.exports = {
  getItems
}