const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("Couldn't find .env file!");
}

module.exports = {
    mongo: require("./mongo"),
};
