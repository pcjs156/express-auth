const router = require("express").Router();

const controller = require("../controllers/authentication");

router.get("/login", controller.loginView);
router.post("/signup", controller.signUpView);

const jwtMiddleware = require("../middlewares/authentication");
router.use("/test", jwtMiddleware, controller.authCheckView);

module.exports = router;
