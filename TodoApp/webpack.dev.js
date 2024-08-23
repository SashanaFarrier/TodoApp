
const path = require("path");
const common = require("./webpack.config");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "main.build.js",
        path: path.resolve(__dirname, "./wwwroot/dist"),
        clean: true, 
    },
     plugins: [new MiniCssExtractPlugin({
        filename: '[name].css',
        })]

    });
       
   
