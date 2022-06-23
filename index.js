// .env file로 환경 변수 관리하는데 사용
require("dotenv").config();

const loader = require("./src/loaders");

const express = require("express");

async function startServer() {
    const app = express();

    await loader(app);

    const { PORT } = process.env;
    app.listen(PORT, () => {
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
}

startServer();
