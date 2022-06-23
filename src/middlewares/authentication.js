const { verify } = require("../util/jwt");

const authJWT = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("Bearer ")[1];
        const result = verify(token);

        if (result.ok) {
            req.id = result.id;
            next();
        } else {
            res.status(401).send({
                ok: false,
                message: result.message,
            });
        }
    } else {
        res.status(401).json({ message: "No JWT" });
    }
};

module.exports = authJWT;
