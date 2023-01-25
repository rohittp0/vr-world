const CopyPlugin = require("copy-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");


module.exports = {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, "..", "public/robots.txt")},
                {from: path.resolve(__dirname, "..", "public/aminity.glb")},
            ]
        })
    ]
};
