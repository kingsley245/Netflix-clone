const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry file
  output: {
    filename: 'main.js', // Output bundle
    path: path.resolve(__dirname, 'dist'), // Output folder
  },
  mode: 'production', // or 'development'
};
