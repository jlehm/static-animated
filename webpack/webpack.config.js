var webpack = require('webpack');
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./app.js", //relative to root of the application
    output: {
      path: path.join(__dirname, "./dist/"),
      filename: "./dist/app.bundle.js" //relative to root of the application
    },
    watch:true,
    devServer: {
      contentBase: path.join(__dirname, "./dist/")
    },
    module:{
      rules:[
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          /*
            options: {
              presets: ['@babel/preset-env']
            }
          */
          }
        },
        {
          test:/\.(s*)css$/,
          use:['style-loader','css-loader','sass-loader']
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[hash]-[name].[ext]'
              }
          }]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'fonts/'
              }
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
          hash: true,
          title: 'static-webpack',
          template: './app/html/index.html',
          path: path.join(__dirname, "../dist/"),
          //filename: './dist/index.html' //relative to root of the application
      }),
      new CopyWebpackPlugin([{
          from:'app/images',
          to:'images'
      }]),
// why isn't this working, why do i need to rely on testing for font formats?
/*      new CopyWebpackPlugin([{
          from:'app/fonts',
          to:'fonts'
      }])
*/ ]

}
