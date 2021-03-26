const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const common = {
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        query: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
          ],
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        test : /\.scss$/,
        use: {
          loader: 'sass-loader',
          options: {
            includePaths: ["./node_modules"]
          }
        }
      },
    ],
  },
};

const clientConfig = {
  ...common,

  mode: 'development',

  name: 'client',
  target: 'web',

  entry: {
    client: [
      '@babel/polyfill',
      './src/client.tsx',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: module => /node_modules/.test(module.resource),
          enforce: true,
        },
      },
    },
  },

  devtool: 'cheap-module-source-map',

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

const serverConfig = {
  ...common,

  mode: 'development',

  name: 'server',
  target: 'node',
  externals: [nodeExternals()],

  entry: {
    server: ['@babel/polyfill', path.resolve(__dirname, 'src', 'server.tsx')],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.js',
  },

  devtool: 'cheap-module-source-map',

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = [clientConfig, serverConfig];
