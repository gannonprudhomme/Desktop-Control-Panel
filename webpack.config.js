/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = (env, argv) => ({
  mode: 'development',
  entry: {
    app: './src/index.ts',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
  },
  devtool: argv.mode === 'production' ? 'none' : 'inline-source-map',
  plugins: [
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'config/www/community/Desktop-Control-Panel/'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
});
