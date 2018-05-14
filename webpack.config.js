const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        'whatwg-fetch': 'whatwg-fetch',
        'home': './ClientApp/app/Home.tsx',
        'dashboard': './ClientApp/app/Dashboard.tsx',
        'sales-entry': './ClientApp/app/SalesEntry.tsx',
        'manage-conditions': './ClientApp/app/admin/Conditions',
        'manage-employees': './ClientApp/app/admin/Employees',
        'manage-locations': './ClientApp/app/admin/Locations',
        'manage-operationhours': './ClientApp/app/admin/OperationHours',
        'manage-producttypes': './ClientApp/app/admin/ProductTypes'
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: './js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                //use: 'awesome-typescript-loader?silent=true'
                use: 'ts-loader'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
};