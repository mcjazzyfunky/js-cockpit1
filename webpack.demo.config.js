var path = require('path')

module.exports = {
  entry: './src/demo/run.tsx',

  externals: {
    'chance': 'chance',
    'js-react-utils': 'jsReactUtils',
    'js-react-store': 'jsReactStore',
    'js-spec': 'jsSpec',
    'js-spec/dev-only': 'jsSpec',
    'office-ui-fabric-react': 'Fabric',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-virtualized': 'ReactVirtualized',
    'rxjs': 'rxjs'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
    open: true,
    openPage: '/src/demo/index.html',
    port: 9000,
    hot: true
  }
}
