const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ("./src/main.js"),
  mode: "production",
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'app.js',
  },

  module: {
    rules: [

      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.(scss)$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader", 
            options: {
              importLoaders: 1,
              modules: true,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
          },
        ],
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      }
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
        title: 'BeeJee test',
        template: path.resolve(__dirname, './src/html/template.html'),
        filename: 'index.html', 
    }),
    new CleanWebpackPlugin(),
  ]
}