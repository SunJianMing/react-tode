const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const Webpack = require('webpack')
module.exports = {
  entry:'./src/app.js',
  output:{
    filename:'assets/main.js',
    path:__dirname+'/dist',
    publicPath:'/'
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:'./src/index.html'
    }),
    new Webpack.ProvidePlugin({
      'React':'react',
      "ReactDom":'react-dom',
      "PT":'prop-types'
    })
  ],
  module:{
    rules:[{
      test:/\.js$/,
      use:['babel-loader'],
      include:[__dirname+'/src']
    },{
      test:/\.css$/,
      use:['style-loader','css-loader'],
      exclude:[__dirname+'/node_modules']
    },{
      test:/\.(jpe?g|png|gif|svg)$/,
      use:[{
        loader:'url-loader',
        options:{
          limit:10000
        }
      }]
    },{
      test:/\.(woff|woff2|ttf|eot|otf|svg)$/,
      use:[{
        loader:'url-loader',
        options:{
          limit:10000
        }
      }]
    }]
  },
  resolve:{
    modules:['node_modules',__dirname+'/src/common',__dirname+'/src/components']
  },
  devServer:{
    port:9999,
    contentBase:'./src',
    publicPath:'/'
  }
}
