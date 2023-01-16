const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers/order");
const { protect } = require("../middlewares/auth");

router.post("/", protect, orderController.create);
router.put("/status/:id", orderController.updateStatus);
router.get("/", protect, orderController.get);
router.get("/seller", protect, orderController.getBySeller);
router.get("/detail/:id", orderController.getById);

module.exports = router;
