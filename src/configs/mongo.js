require("dotenv").config();

const { MONGO_USERNAME, MONGO_PW, MONGO_DOMAIN, MONGO_DB } = process.env;

const build_mongo_uri = (username, password, domain, database) =>
    `mongodb+srv://${username}:${password}@${domain}/${database}?retryWrites=true&w=majority`;

const config = {
    MONGO_URI: build_mongo_uri(
        MONGO_USERNAME,
        MONGO_PW,
        MONGO_DOMAIN,
        MONGO_DB
    ),
};

module.exports = config;
