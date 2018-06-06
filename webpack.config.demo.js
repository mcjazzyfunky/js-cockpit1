const
  path = require('path'),
  HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: './src/demo/demo.js',
    devtool: 'inline-source-map',
    devServer: {
      openPage: 'demo/demo.html',
    },
    
    module: {
      unknownContextCritical: false,
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['babel-preset-env', 'react'],
            plugins: [
              'transform-object-rest-spread',
              ['import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true
              }],
            ]
          }
        },
        {
          test: /\.less$/,

          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader', options: { javascriptEnabled: true } }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
      }
    },
    output: {
      filename: 'demo/demo-bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'demo/demo.html',
        template: 'src/demo/demo.html',
        css: ['src/demo/demo.less'],
        inject: 'body'
      })
    ]
  };
};
