const express = require(`express`);
const router = express.Router();
const { usersController } = require("../controllers/users");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/register/", usersController.register);

router.post("/verification", usersController.verificationOtp);
router.post("/login", usersController.login);
router.post("/forgot-password", usersController.forgotPassword);
router.post("/reset-password/:token", usersController.resetPassword);

router.get(`/profile`, protect, usersController.profile);
router.put("/profile", protect, upload.single("photo"), usersController.update);

module.exports = router;
