const webpack = require("webpack");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/docs",
        filename: "bundle.js"
    }
};