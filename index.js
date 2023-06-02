require("dotenv").config()
const app = require("./src/app")

const PORT = process.env.PORT || 3023
app.listen(PORT,()=>{
  console.log(`Server app is running on http://localhost:${PORT}`)
})