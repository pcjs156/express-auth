const router = require("express").Router();

const controller = require("../controllers/authentication");

router.get("/login", controller.loginView);
router.post("/signup", controller.signUpView);

module.exports = router;
