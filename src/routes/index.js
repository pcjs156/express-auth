const router = require("express").Router();

const authenticationRouter = require("./authentication");

router.use("/auth", authenticationRouter);

module.exports = router;
