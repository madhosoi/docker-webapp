const webpack = require('webpack');

const config = (env = {}) => {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        API_URL: JSON.stringify(process.env.API_URL || 'http://localhost:3000'),
        API_TOKEN_URL: JSON.stringify(process.env.API_TOKEN_URL || 'http://localhost:3000'),
        API_USER: JSON.stringify(process.env.API_USER || ''),
        API_PWD: JSON.stringify(process.env.API_PWD || ''),
      },
    }),
  ];

  let devtool = 'inline-source-map';
  if (env.production) {
    devtool = false;
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false,
        },
      })
    );
  }

  return {
    devtool,
    context: __dirname,
    entry: ['babel-polyfill', './app/App.js'],
    output: {
      path: `${__dirname}/public/js/`,
      publicPath: '/js/',
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: [
          /node_modules/,
        ],
        loader: 'babel-loader',
      }],
    },
    devServer: {
      contentBase: `${__dirname}/public`,
      historyApiFallback: true,
    },
    plugins,
    
  };
};

module.exports = config;
