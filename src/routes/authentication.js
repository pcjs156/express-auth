const router = require("express").Router();

const controller = require("../controllers/authentication");

/**
 * @path {GET} http://localhost:8080/auth/login
 * @description 로그인 페이지
 */
router.get("/login", controller.loginView);

/**
 * @path {POST} http://localhost:8080/auth/signup
 * @description 회원가입 페이지
 */
router.post("/signup", controller.signUpView);

module.exports = router;
