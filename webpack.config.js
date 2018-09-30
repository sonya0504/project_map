const webpack = require("webpack");

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,//$ oznacza koniec stringa nazwy
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    entry: "./src/app.js",
    output: {
        path: __dirname + "/docs",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: "./docs"
    }
};