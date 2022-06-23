const jwt = require("jsonwebtoken");
const { auth: authConfig } = require("../configs");

// 길이 length 만큼의 랜덤한 문자열을 출력
function __createNewSecret(length = 30) {
    require("crypto").randomBytes(length, function (err, buffer) {
        var token = buffer.toString("hex");
        console.log(token);
    });
}

module.exports = {
    sign: (user) => {
        const payload = {
            id: user.id,
        };

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
