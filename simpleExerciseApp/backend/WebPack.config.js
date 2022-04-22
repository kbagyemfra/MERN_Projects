var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require("path");

module.exports = {
  context: path.join(__dirname, "./src"),
  devtool: debug ? "inline-sourcemap" : true,
  entry: "../src/index.js",

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf)$/i, // a regular expression that catches .js files
        exclude: /node_modules/,
        loader: "url-loader",
      },
      {
        test: /\.(js|.jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2016", "stage-0"],
          plugins: [
            "react-html-attrs",
            "transform-decorators-legacy",
            "transform-class-properties",
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
  },
  output: {
    path: __dirname + "/public/",
    // publicPath: "/public/",
    filename: "build.js",
  },
  plugins: debug
    ? []
    : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          sourcemap: false,
        }),
      ],
  devServer: {
    port: 4500, // most common port
    contentBase: "./public",
    inline: true,
    historyApiFallback: true,
  },
};
