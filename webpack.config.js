const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
//   devtool: "source-map",
  entry: {
    app1: "./src/test1.js",
    app2: "./src/test2.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
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
    extensions: [".js"],
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
  ],
};
