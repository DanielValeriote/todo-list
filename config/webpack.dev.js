const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({template:"./public/index.html"})],
  module: {
    rules: [
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader, 
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
               postcssOptions: {
                 plugins: [
                   [
                     "postcss-preset-env"
                   ]
                 ]
               }
            }
          },
          "sass-loader",
        ]
      },
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
}