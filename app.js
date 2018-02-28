const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const config = require("./webpack.config.js");
const compiler = webpack(config);
const fs = require('fs');
const server = new WebpackDevServer(compiler, {
  inline: true,
  hot: true,
  publicPath:'/',
  stats: {
    chunks: false
  },
  open:true,
  historyApiFallback: true,
  disableHostCheck: true,
  // proxy: {
  //   '/': {
  //     target: 'http://192.168.0.107:8080/', //'http://192.168.0.107:8080/',
  //     secure: false,
  //   },
  // }
});
console.log(process.env.NODE_ENV, "start server...");
server.listen(8888, "localhost", function() {
  //console.log("http://localhost:9090/",config.output.publicPath);
});
