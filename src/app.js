const cors = require("cors")
const express = require("express")
const {verifyToken,verifyJson} = require("./shared/middlewares/index")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", verifyJson) //midleware verificar json valido
app.use("/api", verifyToken) //midleware verificar jwt
app.use("/api", require("./routes"))





module.exports = app