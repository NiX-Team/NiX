import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const appPath = path.resolve(process.cwd(), 'app')

export default {
  context: appPath,
  target: 'web',
  entry: './src/index.js',
  output: {
    path: path.resolve(process.cwd(), 'build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: appPath,
        options: {
          ignore: false,
          useEslintrc: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: appPath,
            options: {
              babelrc: false,
              presets: ['babel-preset-react-app'],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              { loader: 'css-loader', options: { importLoaders: 1 } },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appPath, 'public/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
}
