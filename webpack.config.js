var config = {
<<<<<<< HEAD
  entry: './client/components/Main.js',
  output: {
    path:'./client/scripts/',
    filename: 'bundle.js',
=======
  entry: './main.js',
  output: {
    path:'./',
    filename: 'index.js',
>>>>>>> e048f553a0d59eee3a282a80012d2c294e63d83d
  },

  devServer: {
    inline: true,
    port: 8080
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}

module.exports = config;