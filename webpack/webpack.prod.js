const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyPlugin = require("copy-webpack-plugin");

const {InjectManifest} = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


module.exports = {
    mode: "production",
    devtool: "source-map",
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackPwaManifest({
            name: "XR Lab CUSAT",
            short_name: "XR Lab",
            description: "A adipoli lab",
            background_color: "#FFFFFF",
            orientation: "any",
            theme_color: "#3E64FF",
            publicPath: "/",
            "gcm_sender_id": "569002618626",
            icons: [
                {
                    src: path.resolve(__dirname, "..", "public/android-chrome-96x96.png"),
                    sizes: [96, 128, 192, 256, 384, 512]
                },
                {
                    src: path.resolve(__dirname, "..", "public/apple-touch-icon.png"),
                    sizes: [96, 128, 192, 256, 384, 512],
                    purpose: "maskable"
                }
            ]
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, "..", "public/robots.txt")},
                {from: path.resolve(__dirname, "..", "public/robo.fbx")},
                {
                    from: path.resolve(__dirname, "..", "public/.well-known/"),
                    to: path.resolve(__dirname, "..", "./build", ".well-known")
                }
            ]
        }),
        new InjectManifest({
            swSrc: path.resolve(__dirname, "..", "src/sw.ts"),
            exclude: [/\.map$/, /^manifest.*\.js(?:on)?$/, /\.(jpe?g|png|webp)$/i]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "public/fallbacks/offline.html"),
            filename: "offline.html",
            title: "Offline",
            inject: false
        })
    ]
};
