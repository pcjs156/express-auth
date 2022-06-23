const User = require("../models/user");
const jwt = require("../util/jwt");

/*
로그인을 수행하는 뷰
*/
exports.loginView = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (username === undefined || password === undefined) {
        res.status(400).json({
            message: "Required fields: 'username', 'password'.",
        });
    }

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            next(err);
        }

        if (user) {
            user.checkPassword(password, function (err, isMatch) {
                if (err) {
                    done(err);
                }

                if (isMatch) {
                    const accessToken = jwt.sign(user);
                    res.status(200).json({ token: accessToken });
                } else {
                    res.status(401).send();
                }
            });
        } else {
            res.status(401).send();
        }
    });
};

/*
회원 가입을 수행하는 뷰
*/
exports.signUpView = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    if (username === undefined || password === undefined) {
        res.status(400).json({
            message: "Required fields: 'username', 'password'.",
        });
    }

    User.findOne({ username: username }, (err, user) => {
        if (err) {
            next(err);
        }

        if (user) {
            res.status(409).json({ message: "Already used username." });
            next();
        } else {
            const newUser = new User({
                username: username,
                password: password,
            });

            newUser.save(next);
            res.status(201).send();
        }
    });
};

/*
JWT 테스트용 뷰
외부에서 해당 View에 접근하기 이전에 JWT verify를 거치게 했으므로
해당 API에 대해 200 status code를 반환 받음은 jwt 인증 성공을 의미함
*/
exports.authCheckView = function (req, res) {
    res.status(200).json({
        id: req.id,
        username: req.user.username,
    });
};
