const cors = require("cors")
const express = require("express")
const verifyToken = require("./shared/middlewares/verifyToken.js")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/private", verifyToken) //midleware verificar jwt
app.use("/private", require("./routes/private"))

app.use("/public", require("./routes/public"))



module.exports = app