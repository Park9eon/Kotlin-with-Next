const path = require("path")
const KotlinWebpackPlugin = require("@jetbrains/kotlin-webpack-plugin")
const webpack = require("webpack")

webpack.Compilation
    .prototype
    .fileTimestamps = new Map()

module.exports = {
    webpack: (config, options) => {
        config.resolve
            .modules
            .push("kotlin_build", "node_modules")

        config.module.rules.push({
            test: /\.js$/,
            include: path.resolve(__dirname, "../kotlin_build"),
            exclude: [
                /kotlin\.js$/,
            ],
            use: ["source-map-loader"],
            enforce: "pre"
        },)

        config.plugins.push(
            new KotlinWebpackPlugin({
                src: __dirname + "/src",
                verbose: true,
                librariesAutoLookup: true,
                optimize: false,
            }),
        )

        return config
    },
}