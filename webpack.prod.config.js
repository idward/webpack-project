const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "hidden-source-map",
  plugins: [
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true,
        },
      },
    }),
  ],
});
