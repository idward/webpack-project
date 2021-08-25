const { merge } = require("webpack-merge");
const common = require("./webpack_dll.config");

module.exports = merge(common, {
  mode: "development",
});
