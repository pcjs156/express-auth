const router = require("express").Router();

const controller = require("../controllers/authentication");

router.get("/login", controller.loginView);
router.post("/signup", controller.signUpView);

// JWT Authentication 작동 확인을 위해 middleware를 임의로 추가
const jwtMiddleware = require("../middlewares/authentication");
router.use("/test", jwtMiddleware, controller.authCheckView);

module.exports = router;
