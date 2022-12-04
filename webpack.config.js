const path = require( 'path' );

module.exports = {
  mode: 'production',
  entry: path.resolve( __dirname, 'src', 'lib.ts' ),
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: 'slapstick.js',
  },
  resolve: {
    // Add '.ts' as resolvable extensions.
    extensions: [".ts"],
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },
    ],
  },
};
