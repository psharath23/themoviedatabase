const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  output: {
    path: path.join(__dirname, "/dist"),
    filename: '[name].chunkhash.bundle.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_VERSION: JSON.stringify('3'),
        API_URL: JSON.stringify('https://api.themoviedb.org'),
        ACCESS_TOKEN: JSON.stringify('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWYzNzhmYjgwYzUzYjY5YTNhY2Y0MjE3ZWVmOGRkNyIsInN1YiI6IjYzYTU4YzFlYzA0OGE5MDA4MDIzZTVkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oQ6HfAdPiu3Uuz8RPXwOfTfJnLaZBFBpsHha9M9yGOA')
      },
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    port: 3030,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(sa|sc|c)ss$/, // styles files
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|otf|ttf|svg)$/, // to import images and fonts
        loader: "url-loader",
        options: { limit: false },
      },
    ],
  },
  resolve: {
    alias: {
      Hooks: path.resolve(__dirname, 'src/Hooks/'),
      Components: path.resolve(__dirname, 'src/Components/'),
      Pages: path.resolve(__dirname, 'src/Pages/'),
      Services: path.resolve(__dirname, 'src/Services/'),
      Contexts: path.resolve(__dirname, 'src/Contexts/'),
    },
    extensions: ['', '.js', '.jsx'],
    fallback: {
      util: require.resolve("util/"),
      fs: false
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {

          sourceMap: false
        },
      }),
    ],
  },
};