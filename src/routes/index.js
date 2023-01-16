const express = require("express");
const router = express.Router();
const userRouter = require("../routes/users");
const productRouter = require("../routes/products");
const bagRouter = require("../routes/bag");
const orderRouter = require("../routes/orders");

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/bag", bagRouter);
router.use("/order", orderRouter);

module.exports = router;
