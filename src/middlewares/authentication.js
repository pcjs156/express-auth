/*
    인증 관련 Middleware
*/

const User = require("../models/user");
const { verify } = require("../util/jwt");

/*
    JWT 인증을 수행하는 middleware로,
    1. JWT가 'Bearer {{ JWT }}'의 형태로 Authorization header에 전달되지 않은 경우
    2. JWT decoding 중 문제가 발생한 경우 (유효하지 않은 token)
    3. 만료된 JWT인 경우
    위 세 가지 경우 401 status code를 반환하도록 함
*/
const authJWT = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("Bearer ")[1];
        const result = verify(token);

        if (result.ok) {
            req.id = result.id;
            User.findOne({ id: req.id }, (err, user) => {
                if (err) {
                    next(err);
                } else {
                    // JWT가 유효함이 검증되면 req 객체에
                    // 해당 JWT를 생성한 사용자를 속성으로 추가함 (View에서 받아 쓰도록)
                    req.user = user;
                    next();
                }
            });
        } else {
            res.status(401).send({
                ok: false,
                message: result.message,
            });
        }
    } else {
        res.status(401).json({ message: "No JWT" });
    }

    return;
};

module.exports = authJWT;
