const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { NoEmitOnErrorsPlugin, ProgressPlugin } = require("webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  //   devtool: "source-map",
  target: "node",
  entry: path.resolve(__dirname, "main.server.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    // chunkFilename: "[name].[chunkhash:8].js",
    // publicPath: "https://cdn.example.com/assets/",
  },
  module: {
    rules: [
      // {
      //   test: /\.(scss|sass)$/,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           config: path.resolve(__dirname, "postcss.config.js"),
      //         },
      //       },
      //     },
      //     "sass-loader",
      //   ],
      // },
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
              name: "img/[name]-[contenthash:8].[ext]",
              publicPath: "http://localhost:8080",
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
  externals: [nodeExternals()], // 排除node_module模块打包进文件
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ProgressPlugin(),
    new NoEmitOnErrorsPlugin(),
  ],
};
