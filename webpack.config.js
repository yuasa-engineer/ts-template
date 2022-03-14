const WebpackModule = require('./webpackModule.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const App = {
  mode: 'development',
  entry: './src/app.ts',
  output: {
    path: `${__dirname}/dist`,
    filename: "app.js"
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
				test: /\.html$/i,
				loader: 'html-loader',
			},
      {
				test: /\.(png|jpe?g|gif|svg)$/i,
				generator: {
					filename: `./asset/image`,
				},
				type: 'asset/resource',
			},
      {
				test: /\.(mp3|wav)$/i,
				generator: {
					filename: `./asset/sound`,
				},
				type: 'asset/resource',
			},
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      }
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  plugins: [
		new HtmlWebpackPlugin({
      inject: true,
			filename: 'index.html',
			template: './src/index.html',
			chunk: ['app'],
      hash: true,
      alwaysWriteToDisk: true
		}),
    new HtmlWebpackHarddiskPlugin()
	],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    devMiddleware: {
      publicPath: "/"
    },
    open: true
  }
}


module.exports = App;
