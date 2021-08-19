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
  entry: {
    page1: "./src/pages/page1/index.tsx",
    page2: "./src/pages/page2/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash:8].js",
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
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.(js|jsx)$/,
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
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
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
      title: "Page One",
      template: path.resolve(__dirname, "src", "assets", "index.html"),
      filename: "page1.html",
      chunks: ["page1"],
    }),
    new HtmlWebpackPlugin({
      title: "Page Two",
      template: path.resolve(__dirname, "src", "assets", "index.html"),
      filename: "page2.html",
      chunks: ["page2"],
    }),
    new EslintWebpackPlugin({
      overrideConfigFile: path.resolve(__dirname, ".eslintrc"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
  ],
};
