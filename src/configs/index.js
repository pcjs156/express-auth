const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

const envFound = dotenv.config();

if (envFound.error) {
    throw new Error("Couldn't find .env file!");
}

/* 아래 require를 통한 설정값 초기화는
   dotenv.config의 호출을 전제로 함 */
module.exports = {
    mongo: require("./mongo"),
    auth: require("./authentication"),
};
