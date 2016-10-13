var path = require("path")

  module.exports = {
    devServer: {
      port: 3005,
      proxy: {
        '/': {
          bypass: function(req, res, proxyOptions) {
            return '/src/index.html';
          }
        }
      }
    },
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: '/dist/'
    },
    module: {
      loaders: [
        {test: /\.css$/, loader: "style!css"},
        {
          test: /\.js$/,
          loader: "babel",
          query: {
            presets: ['es2015']
          }
        }
      ]
    },

  }
