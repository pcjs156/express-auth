module.exports = {
    saltFactor: 10, // 해시 알고리즘 적용 횟수 (비밀번호 암호화 저장에 사용)
    jwt: {
        algorithm: "HS256",
        secretKey: process.env.JWT_SECRET,
        expiresIn: "1h",
    },
};
