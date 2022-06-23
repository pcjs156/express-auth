require("dotenv").config();
const { NODE_ENV } = process.env;

const dbConfig = require("../configs/mongo");

const mongoose = require("mongoose");

module.exports = async () => {
    if (NODE_ENV !== "production") {
        mongoose.set("debug", true);
        console.log("MongoLoader: debug mode on");
    }

    mongoose
        .connect(dbConfig.MONGO_URI, {
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
