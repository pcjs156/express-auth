const router = require("express").Router();

const controller = require("../controllers/authentication");

router.get("/login", controller.loginView);
router.post("/signup", controller.signUpView);
router.use("/auth-test", controller);

const jwtMiddleware = require("../middlewares/authentication");
router.get("/test", jwtMiddleware, controller.authCheckView);

module.exports = router;
