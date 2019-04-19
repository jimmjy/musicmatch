const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_module/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env', { useBuiltIns: 'usage' }], '@babel/preset-react'],
						plugins: ['transform-class-properties'],
					},
				},
			},
			{
				test: /\.s?css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(ttf|png)$/,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css',
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
		}),
		new CleanWebpackPlugin(),
	],
};
