const User = require("../models/user");

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
                    res.status(200).send();
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
