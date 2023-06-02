const cors = require("cors")
const express = require("express")
const conn = require("./shared/config/db.js")

const app = express()

app.use(cors())


app.get("/",(req,res)=>{
  res.send("Welcome")
})
app.get("/api",async (req,res)=>{
  const [resul] = await conn.query(`SELECT "algo" as RESULT`);
  console.log(resul)
  res.json(resul)
})
module.exports = app