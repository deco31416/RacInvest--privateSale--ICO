const webpack = require("webpack");

module.exports = function override(config, env) {
    config.resolve.fallback = {
      http: require.resolve("http-browserify"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      buffer: require.resolve("buffer"),
      stream: require.resolve("stream-browserify"),
    };

    config.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        }),
      );
    
    return config;
  };