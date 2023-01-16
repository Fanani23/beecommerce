const express = require("express");
const router = express.Router();
const { bagController } = require("../controllers/bag");
const { protect } = require("../middlewares/auth");

router.post("/", protect, bagController.create);
router.get("/", protect, bagController.get);
router.delete("/delete/:id", protect, bagController.delete);
router.delete("/delete/all", protect, bagController.deleteAll);

module.exports = router;
