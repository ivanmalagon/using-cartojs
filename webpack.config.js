const webpack = require('webpack');
const path = require('path');
const cartodbNpmLinked = true;
const cartodbjsModules = cartodbNpmLinked
  ? path.resolve('../cartodb.js', 'node_modules')
  : '';
const cartodbjsPath = cartodbNpmLinked
  ? path.resolve('../cartodb.js')
  : '';

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  devtool: 'source-map',
  resolve: {
    symlinks: false,
    modules: ['node_modules', cartodbjsModules]
  },
  resolveLoader: {
    modules: ['node_modules', cartodbjsModules]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'shim-loader',
        include: [
          path.resolve(__dirname, 'node_modules/cartodb.js'),
          cartodbjsPath
        ],
        options: {
          shim: {
            'wax.cartodb.js': {
              exports: 'wax'
            },
            'html-css-sanitizer': {
              exports: 'html'
            }
          }
        }
      },
      {
        test: /\.tpl$/,
        use: 'tpl-loader',
        include: [
          path.resolve(__dirname, 'node_modules/cartodb.js'),
          cartodbjsPath
        ]
      },
    ]
  },
  node: {
    fs: 'empty' // This fixes the error Module not found: Error: Can't resolve 'fs'
  }
};
