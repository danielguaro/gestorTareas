const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	// para resetear cada vez que realice el npm run build
	output: {
		clean: true,
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
		],
	},
	optimization: {},
	plugins: [
		// se genera una nueva instancia
		new HtmlWebpack({
			title: 'Mi Webpack App',
			// filename: 'index.html',
			// template --> archivo del cual quiero q se base el html que se crea
			template: './src/index.html',
		}),
		new MiniCssExtract({
			filename: '[name].css',
			ignoreOrder: false,
		}),
		new CopyPlugin({
			patterns: [{ from: 'src/assets/', to: 'assets/' }],
		}),
	],
};
