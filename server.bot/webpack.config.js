const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const enableMinification = arguments['p'];
const nodeModules = {};

fs.readdirSync('node_modules')
    .filter((x) => ['.bin'].indexOf(x) === -1)
    .forEach((module) => nodeModules[module] = 'commonjs ' + module);

module.exports = function (environment) {
    return {
        context: path.resolve(__dirname, '.'),
        entry: {
            'server': ['./src/index']
        },
        externals: nodeModules,
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                }
            ]
        },
        output: {
            filename: '[name].packed.js',
            library: 'ef.lms365.[name]',
            libraryTarget: 'this',
            path: path.resolve(__dirname, './dist/')
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({ tsconfig: './tsconfig.json' }),
            new webpack.ExtendedAPIPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        resolve: {
            extensions: ['.js', '.ts']
        },
        target: 'node'
    };
};