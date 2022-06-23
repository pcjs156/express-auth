const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const { auth: authConfig } = require("../configs");

const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// 모델이 저장되기 전에 실행되는 callback
userSchema.pre("save", function (done) {
    const user = this;

    if (!user.isModified("password")) {
        return done();
    }

    bcrypt.genSalt(authConfig.saltFactor, (err, salt) => {
        if (err) {
            return done(err);
        }

        bcrypt.hash(
            user.password,
            salt,
            function () {},
            (err, hashedPassword) => {
                if (err) {
                    return done(err);
                } else {
                    user.password = hashedPassword;
                    done();
                }
            }
        );
    });
});

userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, (err, isMatch) => done(err, isMatch));
};

module.exports = mongoose.model("User", userSchema);
