// webpack.config.js

module.exports = {
  entry: './renderer.js',
  output: {
    filename: 'renderer_packed.js'
  },
  devtool: "source-map"
};
