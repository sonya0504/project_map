const webpack = require("webpack");

module.exports = {
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "[local]_[hash]"
                        }
                    },
                    {
                        loader: "sass-loader"
                    }

                ]
            },
            {
                test: /\.(jpg|png|gif|jpeg|woff|woff2)$/, //następny znak ma być traktowany jako dosłownie
                use: ["file-loader"]
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx"]
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