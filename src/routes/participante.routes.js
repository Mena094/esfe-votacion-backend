const router = require("express").Router()
const { verifyTokenJuez } = require("../shared/middlewares/verifyToken")

const {
  puntaje,
  getByCodigo,
  readItems,
  readVotoById,
  createItem,
  updateItem,
  deleteItem,
  votar } = require("../controllers/participante.controllers")

router.get("/", readItems)
router.get("/:codigo/:codigoJuez", getByCodigo)
router.post("/", createItem)
router.put("/", updateItem)
router.delete("/:Id", deleteItem)

router.get("/voto", readVotoById)
router.post("/voto", verifyTokenJuez, votar)
router.post("/test", (req, res)=> {
  res.json({si:"no"})
})

module.exports = router