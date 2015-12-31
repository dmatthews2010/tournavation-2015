var webpack = require("webpack");
var path = require("path");
var GlobalizePlugin = require("globalize-webpack-plugin");
var ReactGlobalizePlugin = require('react-globalize-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
	target: "web",
	cache: false,
	context: path.join(__dirname),
	devtool: false,
	debug: false,
	entry: {
		main: ["babel-polyfill", "./src/client/app.js"],
		vendor: [
	    "alt",
	    "alt-container",
	    "alt-utils/lib/withAltContext",
	    'alt-utils/lib/makeFinalStore',
	    "cldr",
			"globalize",
			"globalize/dist/globalize-runtime/number",
			"globalize/dist/globalize-runtime/plural",
			"globalize/dist/globalize-runtime/message",
			"globalize/dist/globalize-runtime/currency",
			"globalize/dist/globalize-runtime/date",
			"globalize/dist/globalize-runtime/relative-time",
	"cldr-data/main/en/ca-gregorian.json",
	"cldr-data/main/en/characters.json",
	"cldr-data/main/en/dateFields.json",
	"cldr-data/main/en/numbers.json",
	"cldr-data/main/es/ca-gregorian.json",
	"cldr-data/main/es/characters.json",
	"cldr-data/main/es/dateFields.json",
	"cldr-data/main/es/numbers.json",
	"cldr-data/supplemental/calendarData.json",
	"cldr-data/supplemental/likelySubtags.json",
	"cldr-data/supplemental/numberingSystems.json",
	"cldr-data/supplemental/plurals.json",
	"cldr-data/supplemental/timeData.json",
	"cldr-data/supplemental/weekData.json",
	    "history",
	    "immutable",
	    "moment",
	    "node-uuid",
	    "react",
	    "react-dom",
	    "react-router",
	    "superagent"
		]
	},
	output: {
		path: path.join(__dirname, "static/dist"),
		filename: "app-bundle.js",
		publicPath: "dist/"
	},
	plugins: [
		new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false}),
		new webpack.DefinePlugin({"process.env": {NODE_ENV: '"production"'}}),
		/*new ReactGlobalizePlugin({
			production: true,
			developmentLocale: "en",
			supportedLocales: ["en", "es"],
			messages: path.join(__dirname, "src/shared/globalization/[locale].json"),
			writeMessages: true,
			output: path.join(__dirname, "static/dist/i18n/[locale].js")
		}),*/
		new CommonsChunkPlugin("vendor", "vendor-bundle.js"),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{test: /\.json$/, loaders: ["json"]},
			{test: /\.js$/, loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0"], exclude: /node_modules/},
			{test: /\.jsx?$/, loaders: ["babel?cacheDirectory&presets[]=es2015&presets[]=react&presets[]=stage-0"], exclude: /node_modules/},
			{test: /\\.css$/, loader: "style!css"},
			{test: /\\.scss$/, loader: "style!css!sass"},
			{test: /\\.sass$/, loader: "style!css!sass?indentedSyntax=sass"},
		  {test: /\\.less$/, loader: "style!css!less"},
		  {test: /\\.gif$/, loader: "url-loader?mimetype=image/png"},
		  {test: /\\.woff(2)?(\\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?mimetype=application/font-woff"},
		  {test: /\\.(ttf|eot|svg)(\\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[name].[ext]"}
		],
		postLoaders: [],
		noParse: /\.min\.js/
	},
	resolve: {
		alias: {
			react: path.join(__dirname, "node_modules/react"),
			cldr: path.join(__dirname, "node_modules/cldrjs/dist/cldr")
		},
		modulesDirectories: [
			"src",
			"node_modules",
			"web_modules"
		],
		extensions: ["", ".js", '.jsx', 'json', '.sass', '.scss', '.less', '.css']
	},
	node:    {
		__dirname: true,
		fs: 'empty'
	}
};