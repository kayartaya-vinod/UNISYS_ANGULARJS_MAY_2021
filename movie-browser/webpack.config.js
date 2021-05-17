const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: '/src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:8080/dist',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './index.html',
                    to: '.',
                },
                {
                    from: 'templates/**',
                    to: '.',
                },
            ],
        }),
    ],
};
