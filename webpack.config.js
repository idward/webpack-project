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
  target: 'electron-renderer',
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[fullhash:8].js",
    // chunkFilename: "[name].[chunkhash:8].js",
    // publicPath: "https://cdn.example.com/assets/",
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
              name: "img/[name]-[contenthash:8].[ext]",
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          name: "common", //提取出来的文件命名
          chunks: "all",
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
        },
      },
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
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
      // filename: "page1.html",
      // chunks: ["common", "page1"],
      // inject: false,
    }),
    // new HtmlWebpackPlugin({
    //   title: "Page Two",
    //   template: path.resolve(__dirname, "src", "assets", "index.html"),
    //   filename: "page2.html",
    //   chunks: ["common", "page2"],
    //   inject: false,
    // }),
    new EslintWebpackPlugin({
      overrideConfigFile: path.resolve(__dirname, ".eslintrc"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
    }),
  ],
};
