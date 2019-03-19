var path = require('path')

module.exports = {
  entry: './src/demo/run.tsx',

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  
  output: {
    filename: 'build/demo.js',
    path: path.resolve(__dirname, 'build')
  },

  devServer: {
    contentBase: path.join(__dirname),
    openPage: '/src/demo/index.html',
    port: 9000,
    hot: true
  }
}
