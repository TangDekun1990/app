const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''

// https://www.jianshu.com/p/5ba253651c3b

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index : './src/main.js',
    note  : './src/note.js'
  },

  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' :'[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },

  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },

  plugins: [
  
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    new webpack.ProvidePlugin({
      $ : 'jquery'
    }),

    new HtmlWebpackPlugin({
      title : '登录',
      template: 'src/index.html',
      chunks : ['vendor', 'manifest', 'index']
    }),

    // new HtmlWebpackPlugin({
    //   title : '记事本',
    //   template: 'src/notebooks.html',
    //   chunks : ['vendor', 'manifest', 'note']
    // }),
  ],

  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      'vue' : 'vue/dist/vue.js'
    }
  },

  devServer: {
    host: '127.0.0.1',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  
  devtool: options.dev ? '#eval-source-map' : '#source-map'
});



  // module.exports.plugins = (module.exports.plugins || []).concat([

  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: '"production"'
  //     }
  //   }),

  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })

  // ])  
