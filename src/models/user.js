const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const { auth: authConfig } = require("../configs");

const { Schema } = mongoose;

/*
    모든 사용자가 하나씩 가지는 고유 계정 Document Schema
    (외부에서 해당 document를 가리키도록 하여 사용자 유형별 추가 정보를 저장할 예정)
*/
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

/*
    모델이 저장되기 전에(create/modify 등) 실행되는 callback을 지정
    => 비밀번호를 평문으로 저장하지 않고, hashing하여 저장함
       (userSchema.checkPassword로 대조)
*/
userSchema.pre("save", function (done) {
    const user = this;

    // password의 변경이 없는 경우 이미 hashing되었으므로 다시 수행하지 않음
    if (!user.isModified("password")) {
        return done();
    }
    // password가 변경된 경우 hashing을 (다시) 수행함
    // Model.create에 의해 해당 callback이 호출된 경우,
    // user.isModified('password')가 항상 참이므로 아래 codeblock이 실행됨
    else {
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
    }
});

/*
    비밀번호가 저장될 때 사용된 동일한 hashing algorithm을 사용해
    Document에 저장된 비밀번호와 확인하려는 비밀번호의 hashed value를 비교함
    (callback 함수 done의 사용 방법은 loginView를 참고)
*/
userSchema.methods.checkPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, (err, isMatch) => done(err, isMatch));
};

module.exports = mongoose.model("User", userSchema);
