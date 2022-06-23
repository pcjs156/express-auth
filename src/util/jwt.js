const jwt = require("jsonwebtoken");
const { auth: authConfig } = require("../configs");

// 길이 length 만큼의 랜덤한 문자열을 출력 (JWT Secret key 생성에 사용)
function __createNewSecret(length = 30) {
    require("crypto").randomBytes(length, function (err, buffer) {
        var token = buffer.toString("hex");
        console.log(token);
    });
}

module.exports = {
    // Access token 발급에 사용
    sign: (user, additionalInfo) => {
        // 원하는 데이터를 additionalInfo 객체에 추가해서 수정 가능
        const payload = {
            id: user.id,
            ...additionalInfo,
        };

        console.log(payload);

        return jwt.sign(payload, authConfig.jwt.secretKey, {
            algorithm: authConfig.jwt.algorithm,
            expiresIn: authConfig.jwt.expiresIn,
        });
    },

    verify: (token) => {
        let decoded = null;

        try {
            decoded = jwt.verify(token, authConfig.jwt.secretKey);
            return {
                ok: true,
                id: decoded.id,
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message,
            };
        }
    },
};
