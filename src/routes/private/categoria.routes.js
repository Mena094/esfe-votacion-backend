const router = require("express").Router()
const {
  readItems,
  readParticipaneById,
  createItem,
  updateItem,
  deleteItem } = require("../../controllers/categoria.controllers")

router.get("/", readItems)
router.get("/:Id/participante", readParticipaneById)
router.post("/", createItem)
router.put("/", updateItem)
router.delete("/:Id", deleteItem)


module.exports = router