const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /moment$/,
      }),
    ],
  },
};
