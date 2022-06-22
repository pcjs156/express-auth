require("dotenv").config();
const { PORT } = process.env;

const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        info: {
            version: "0.0.1",
            title: "Express practice",
            description: "Express 연습용 프로젝트",
        },
        servers: [
            {
                url: `http://localhost:${PORT}`, // 요청 URL
            },
        ],
        basePath: "/",
    },
    apis: ["../routes/*.js"], //Swagger 파일 연동
};
const specs = swaggereJsdoc(options);

module.exports = { swaggerUi, specs };
