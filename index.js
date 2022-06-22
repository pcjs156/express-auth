const express = require("express");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3200;

const app = express();

app.get("/", (req, res, next) => {
    res.send("Hello, World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
