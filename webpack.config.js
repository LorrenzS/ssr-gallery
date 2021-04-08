const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const clientConfig = {
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".css", ".scss"],
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
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],

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

  mode: 'development',

  name: 'server',
  target: 'node',
  externals: [nodeExternals()],

  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".css", ".scss"],
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
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],

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
