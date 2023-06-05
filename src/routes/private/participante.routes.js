const router = require("express").Router()
const {
  readItems,
  readVotoById,
  createItem,
  updateItem,
  deleteItem } = require("../../controllers/participante.controllers")

router.get("/", readItems)
router.get("/:Id/voto", readVotoById)
router.post("/", createItem)
router.put("/", updateItem)
router.delete("/:Id", deleteItem)


module.exports = router