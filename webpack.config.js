'use strict'
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack=require('webpack');
const babelpolyfill = require("babel-polyfill");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// console.log(name],'name')
const WebpackMd5Hash = require('webpack-md5-hash');
const extractCSS = new ExtractTextPlugin({filename:"[name].css"})
const extractLESS = new ExtractTextPlugin({filename:'[name].css'});
// console.log(path.join(__dirname, 'public'),'path.join(__dirname')

const __NODE_ENV__ = process.env.NODE_ENV || 'develop'; //环境原始值

const webpackConfig = {
  entry: {
	  'index':['webpack-dev-server/client?http://localhost:8888','webpack/hot/only-dev-server',path.resolve(__dirname, "app/index.entry.js")]
  },
  output: {
    publicPath: __NODE_ENV__ === 'develop' ? '/' :
						__NODE_ENV__ === 'preProd' ? '//test/Erp/' :
							'//prod/Erp/',
    path: path.join(__dirname, 'public'),
    filename:'[name].[hash:5].js',
    chunkFilename: "[name].chunk.js",
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [
      path.join(__dirname,'app'),
      "node_modules"
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      utits: __dirname + '/utils/index.js'
    }
  },
  module:{
    rules:[
	    {
		    test: /\.jsx?$/,
		    exclude: /node_modules/,
		    use: ['babel-loader','react-hot-loader/webpack']
	    },
      {
        test: /global\.css$/,
        use: ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:['css-loader']
          })
        // use: [
        //   'style-loader',
        //   'css-loader'
        // ]
      },
      {
        test: /global\.less$/,
        loader: ExtractTextPlugin.extract({
            fallback:'style-loader',
            use:['css-loader?importLoaders=2','autoprefixer-loader','less-loader']
          })
      },
      {
        test: /^((?!global).)*\.less$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:['css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]','less-loader']
        })
      },
      {
        test: /^((?!global).)*\.css$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]'
        }),
        // use: ['style-loader!css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]',
        // ]
      },
      {
        test:  /\.(jpg|png|gif)$/,
        use: ['url-loader?limit=8192']
      }
    ]
  },
  plugins:[
    extractCSS,
    extractLESS,
    // new HashedModuleIdsPlugin(),// 不再使用数字索引做 module id，而使用 hash name，长缓存
		new WebpackMd5Hash(), //chunkhash 基于文件内容产生，长缓存
    new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: __NODE_ENV__ === 'develop'? JSON.stringify("develop") : JSON.stringify("prod")
			}
		}),
    // __NODE_ENV__ == 'develop'?(new webpack.HotModuleReplacementPlugin()):null
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
	  //     	compress: {
		//         warnings: false
	  //    	 }
	  // }),
	  new HtmlWebpackPlugin({
  		filename: 'index.html',
  		template: './app/index.html',
  		inject: true,
  		chunks: ['index'],
  		hash: false,
  		chunksSortMode: 'dependency'
	  }),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   names: ['vendor','manifest'],
    //   minChunks: function (module, count) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(
    //         path.join(__dirname, '../node_modules')
    //       ) === 0
    //     )
    //   }
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //
    // }),
  ]
}

 if (__NODE_ENV__ == 'develop') {
   webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
 } else {
   console.log(__NODE_ENV__,'__NODE_ENV__')
	 webpackConfig.externals = {
		 react: 'React',
		 'react-dom': 'ReactDOM',
		 antd: 'antd',
		 jquery: '$',
		 highcharts: 'Highcharts',
		 moment: 'moment',
	 };
	 webpackConfig.plugins.push(
		 new webpack.optimize.UglifyJsPlugin({
			 compress: {
				 warnings: false,
			 }
		 }),
		 new webpack.NoErrorsPlugin()
	 )
 }

module.exports = webpackConfig;
