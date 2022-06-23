/* 
    MongoDB 관련 설정값 관리
    (dotenv.config의 호출을 전제로 함)
*/

const { MONGO_USERNAME, MONGO_PW, MONGO_DOMAIN, MONGO_DB } = process.env;

const build_mongo_uri = (username, password, domain, database) =>
    `mongodb+srv://${username}:${password}@${domain}/${database}?retryWrites=true&w=majority`;

module.exports = {
    MONGO_URI: build_mongo_uri(
        MONGO_USERNAME,
        MONGO_PW,
        MONGO_DOMAIN,
        MONGO_DB
    ),
};
