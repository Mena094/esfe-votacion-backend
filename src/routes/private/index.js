const router = require("express").Router()
const fs = require("fs")
const path = __dirname

const removeExtension = (fileName)=> fileName.split(".").shift()


fs.readdirSync(path).forEach( file => {
  const name = removeExtension(file)
  if(name != "index"){
    console.log("cargando")
    router.use(`/${name}`, require(`./${name}.routes.js`))
  }
})
 
module.exports = router