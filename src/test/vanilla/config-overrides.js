/*
We use this file to in order to be able to use webpack plugin without
ejecting from CRA.
This file is picked up by react-app-rewired that we use in place or react-scripts
*/
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function override(config) {

    if (!config.plugins) {
        config.plugins = [];
    }

    config.plugins.push(...[
        new BundleAnalyzerPlugin()
    ]);

    return config;

};