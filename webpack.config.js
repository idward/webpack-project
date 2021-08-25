const path = require("path");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const { NoEmitOnErrorsPlugin, ProgressPlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DllReferencePlugin = require("webpack/lib/DllReferencePlugin");
// const webpack_dllConfig = require("./webpack_dll.config");

module.exports = {
  //   devtool: "source-map",
  target: "web",
  entry: {
    main: path.resolve(__dirname, "src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    // libraryTarget: "umd",
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
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       default: {
  //         name: "common", //提取出来的文件命名
  //         chunks: "all",
  //         minChunks: 2, //表示提取公共部分最少的文件数
  //         minSize: 0, //表示提取公共部分最小的大小
  //       },
  //     },
  //   },
  // },
  // optimization: {
  //   concatenateModules: false,
  //   providedExports: false,
  //   usedExports: false
  // },
  // externals: {
  //   react: "react",
  // },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new ProgressPlugin(),
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets", "index.html"),
          to: path.resolve(__dirname, "dist", "index.html"),
        },
        // {
        //   from: path.resolve(__dirname, "src", "assets", "favicon.ico"),
        //   to: path.resolve(__dirname, "dist", "img", "favicon.ico"),
        // },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   title: "Page One",
    //   template: path.resolve(__dirname, "src", "assets", "index.html"),
    //   // filename: "page1.html",
    //   // chunks: ["common", "page1"],
    //   // inject: false,
    // }),
    // new HtmlWebpackPlugin({
    //   title: "Dll Library",
    //   template: path.resolve(__dirname, "src", "assets", "index.html"),
    //   inject: false,
    // }),
    new EslintWebpackPlugin({
      overrideConfigFile: path.resolve(__dirname, ".eslintrc"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash:8].css",
    }),
    new DllReferencePlugin({
      manifest: require("./dist/react.manifest.json"),
    }),
    new DllReferencePlugin({
      manifest: require("./dist/polyfill.manifest.json"),
    }),
  ],
};
