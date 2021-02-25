const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
	css: {
		extract: false,
	},
	configureWebpack: {
		optimization: {
			splitChunks: false
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'build.html', // the output file name that will be created
				template: 'public/build-template.html', // this is important - a template file to use for insertion
				inlineSource: '.(js|css)$' // embed all javascript and css inline
			}),
			new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
		]
	}
}