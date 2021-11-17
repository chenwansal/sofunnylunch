module.exports = {
    entry: "./js/App.js",
    output: {
        path: __dirname + "/out",
        filename: "bundle.js"
    },
    mode: "development", // development / production
    externals: {
    }
}