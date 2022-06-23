const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

module.exports = {
    sign: (user) => {
        const payload = {
            id: user.id,
        };

        return jwt.sign(payload, SECRET, {
            algorithm: "HS256",
            expiresIn: "1h",
        });
    },

    verify: (token) => {
        let decoded = null;

        try {
            decoded = jwt.verify(token, SECRET);
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
