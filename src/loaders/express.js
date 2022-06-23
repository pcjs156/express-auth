/*
    Express 및 관련 설정 Loader
*/

const bodyParser = require("body-parser");

module.exports = (app) => {
    // Body Parser 설정
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Error handler middleware
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        console.error(err.message, err.stack);
        res.status(statusCode).json({ message: err.message });

        return;
    });

    // Router 연결
    const router = require("../routes");
    app.use(router);

    console.log("Express loaded!");
};
