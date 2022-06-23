/* 
    계정 및 인증 관련 설정값 관리
    (dotenv.config의 호출을 전제로 함)
*/

module.exports = {
    // 해시 알고리즘 적용 횟수 (비밀번호 암호화 저장에 사용)
    saltFactor: 10,
    // JWT 관련 설정값
    jwt: {
        algorithm: "HS256",
        secretKey: process.env.JWT_SECRET,
        expiresIn: "1h",
    },
};
