
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "/wwwroot/js/main.js",
        module: {
        rules: [
            {
             test: /\.css$/i,
             //use: ["style-loader", "css-loader"], //loads in reverse order
              use: [MiniCssExtractPlugin.loader, "css-loader"],

            },

            //{
            // test: /\.scss$/,
             //use: ["style-loader", "css-loader", "sass-loader"]
            //},
            {
             test: /\.(png|svg|jpg|jpeg|gif|mp4|webp)$/i,
             type: 'asset/resource',
             include: path.resolve(__dirname, './wwwroot'),
            },
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },

}
