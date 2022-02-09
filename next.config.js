const path = require("path")
const webpack = require("webpack")
const KotlinWebpackPlugin = require("@jetbrains/kotlin-webpack-plugin")

const withPlugins = require("next-compose-plugins")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
})
const withPWA = require("next-pwa")
const runtimeCaching = require("next-pwa/cache")

webpack.Compilation
    .prototype
    .fileTimestamps = new Map()

const nextConfig = {
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

module.exports = withPlugins([
    [withBundleAnalyzer],
    [withPWA, {
        pwa: {
            dest: "public",
            runtimeCaching,
        },
    }]
], nextConfig)