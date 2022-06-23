/*
    MongoDB 연결 및 설정 Loader
*/

const { NODE_ENV } = process.env;

const { mongo: mongoConfig } = require("../configs");

const mongoose = require("mongoose");

module.exports = async () => {
    if (NODE_ENV !== "prod") {
        mongoose.set("debug", true);
        console.log("MongoLoader: debug mode on");
    }

    mongoose
        .connect(mongoConfig.MONGO_URI, {
            dbName: "toms",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("MongoDB is successfully connected."))
        .catch((e) => console.log(e));

    mongoose.connection.on("error", (error) => {
        console.log("MongoDB Connection Error:", error);
    });

    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB is disconnected. Trying reconnection..");
        mongoose.connect;
    });

    console.log("Mongo loaded!");
};
