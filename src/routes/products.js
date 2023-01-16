const express = require("express");
const router = express.Router();
const { productController } = require("../controllers/products");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/", protect, upload.single("photo"), productController.create);
router.get("/", productController.get);
router.get("/detail/:id", productController.getById);
router.get("/toko", protect, productController.getSeller);
router.put("/:id", upload.single("photo"), productController.update);
router.delete("/:id", protect, productController.delete);
router.put("/archive/:id", productController.archive);
router.put("/activate/:id", productController.activate);
router.get("/archive/", protect, productController.getArchive);
router.get("/sold", protect, productController.getSold);

module.exports = router;
