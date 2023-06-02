const cors = require("cors")
const express = require("express")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api",require("./routes/index.js")) 

module.exports = app