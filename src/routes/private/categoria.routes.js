const router = require("express").Router()

router.get("/", (req,res)=>{
  res.send({categoria:1})
})

module.exports = router