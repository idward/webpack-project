const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const { NoEmitOnErrorsPlugin, ProgressPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  //   devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash].js",
    publicPath: "https://cdn.example.com/assets/",
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|pdf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024 * 8,
              name: "/img/[name]-[contenthash:8].[ext]",
              //   publicPath: path.resolve(__dirname, "dist", "img"),
            },
          },
        ],
      },
      //   {
      //     test: /\.(jpg|jpeg|png|gif|svg)$/,
      //     use: ["file-loader"],
      //   },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", '.json']
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    hot: true,
    compress: true,
    port: 9000,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressPlugin(),
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets", "favicon.ico"),
          to: path.resolve(__dirname, "dist", "img", "favicon.ico"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "assets", "index.html"),
    }),
    new EslintWebpackPlugin({
      overrideConfigFile: path.resolve(__dirname, ".eslintrc"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
  ],
};
