const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
	mode: 'production',
	// para resetear cada vez que realice el npm run build
	output: {
		clean: true,
		filename: 'main.[contenthash].js',
	},
	module: {
		rules: [
			{
				//busca, implementando una expresión regular
				test: /\.html$/,
				//si encuentra, que haga esto
				loader: 'html-loader',
				// que mueva los atributos
				options: {
					sources: false,
				},
			},
			{
				test: /\.css$/,
				exclude: /styles.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /styles.css$/,
				use: [MiniCssExtract.loader, 'css-loader'],
			},
			{
				test: /\.(png|jpg?g|gif)$/,
				loader: 'file-loader',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizer(), new Terser()],
	},
	plugins: [
		// se genera una nueva instancia
		new HtmlWebpack({
			title: 'Mi Webpack App',
			// filename: 'index.html',
			// template --> archivo del cual quiero q se base el html que se crea
			template: './src/index.html',
		}),
		new MiniCssExtract({
			filename: '[name].[fullhash].css',
			ignoreOrder: false,
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/assets/', to: 'assets/' }],
		}),
	],
};
