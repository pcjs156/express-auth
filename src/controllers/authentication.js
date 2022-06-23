const User = require("../models/user");
const jwt = require("../util/jwt");

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
            return next(err);
        }

        if (user) {
            user.checkPassword(password, function (err, isMatch) {
                if (err) {
                    return done(err);
                }

                if (isMatch) {
                    const accessToken = jwt.sign({ id: user._id });
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
            return next(err);
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

exports.authCheckView = function (req, res, next) {
    res.status(200).json({ id: req.id });
};
