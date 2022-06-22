// .env file로 환경 변수 관리하는데 사용
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const connect = require("./src/models");

const app = express();

const { PORT } = process.env;

// Body Parser 설정
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose 연결
connect();

// Router 연결
const router = require("./src/routes/index");
app.use(router);

// Error handler middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });

    return;
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
