const path=require("path");
const DeclarationBundlerPlugin = require('types-webpack-bundler');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={
    entry:{
        "myLib":path.resolve(__dirname,"src/index.ts")
    },
    output:{
        path:path.resolve(__dirname,"dist"),
        chunkFilename: '[name].js',
        filename: '[name].js'
    },
    devtool:'source-map',
    resolve: { extensions: ['.ts'] },
    plugins:[
        new CleanWebpackPlugin(),       
        /* new DeclarationBundlerPlugin({
            moduleName:'"mylib"',
            out:'./bundle.d.ts',
        }) */
    ],
    module:{
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/],
                loader: 'ts-loader'
            }
        ]
    },
};