var webpack = require('webpack');
var path = require('path');

var env = process.env.NODE_ENV || 'development';
var isProduction = env === 'production';

var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(env)
    }
  })
];

if (isProduction) {
  plugins.push(new webpack.NoErrorsPlugin());
  plugins.push(new webpack.PrefetchPlugin('react'));
  plugins.push(new webpack.optimize.OccurenceOrderPlugin(true));
  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      side_effects: true,
			sequences: true,
      dead_code: true,
			drop_debugger: true,
			comparisons: true,
			conditionals: true,
			evaluate: true,
			booleans: true,
			loops: true,
			unused: true,
			hoist_funs: true,
      hoist_vars: true,
			if_return: true,
			join_vars: true,
			cascade: true,
      drop_console: true,
      properties: true
    },
    mangle: true
  }));
}

var config = {
  debug: !isProduction,

  entry: path.join(__dirname, 'src/index.js'),

  output: {
    path: path.join(__dirname, 'dist/'),
    filename: isProduction ? 'hawk-carousel.min.js' :'hawk-carousel.js',
    library: 'HawkCarousel',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  plugins: plugins
};

module.exports = config;
