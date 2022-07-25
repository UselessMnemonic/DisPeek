const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

let package = require('./package.json');

function compileManifest(content, path) {
   let json = content.toString();
   for (const k in package) {
      json = json.replace(`$${k}`, package[k])
   }
   return json;
}

module.exports = {
   mode: "production",
   entry: {
      content: path.resolve(__dirname, "src", "content.ts"),
   },
   output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [
            {from: "manifest.json", to: "manifest.json", transform: compileManifest}
         ]
      }),
   ],
};
