var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
const NODE_ENV = JSON.parse(process.env.NODE_ENV) || 0;
const NODE_ENV_DEV = 0;
const NODE_ENV_PROD = 1;

var prodConfig = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    autoprefixer({
                      browsers: [
                        '> 1%',
                        'safari 5',
                        'ie > 7',
                        'opera 12.1',
                        'ios 6',
                        'android 4'
                      ]
                    })
                  ];
                }
              }
            },
            { loader: 'sass-loader' },
          ],
        }),
      },
      { test: /\.(png|jpe?g|gif)$/, use: 'url-loader?limit=8192&name=images/[hash].[ext]' },
      { test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/, use: 'url?name=[hash].[ext]' },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin({
      filename: "css/app.bundle.css",
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
};


var devConfig = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'js/[name].bundle.js',
    publicPath: "",
  },
  module: {
    rules: [
      { test: /\.jsx?$/, enforce: 'pre', use: 'eslint-loader', exclude: [/bundle\.js$/, /vendors/], include: path.resolve(__dirname, "src") },
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    autoprefixer({
                      browsers: [
                        '> 1%',
                        'safari 5',
                        'ie > 7',
                        'opera 12.1',
                        'ios 6',
                        'android 4'
                      ]
                    })
                  ];
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
              }
            },
          ],
        }),
      },
      { test: /\.(png|jpe?g|gif)$/, use: 'url-loader?limit=8192&name=images/[hash].[ext]' },
      { test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/, use: 'url?name=[hash].[ext]' },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new ExtractTextPlugin({
      filename: "css/app.bundle.css",
      disable: true,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
  },
};

module.exports = NODE_ENV ? prodConfig : devConfig;
