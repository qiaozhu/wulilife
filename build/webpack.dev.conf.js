'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? {
          warnings: false,
          errors: true
        }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    },
    disableHostCheck: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env'),
      /* 多页面配置修改 这里是用于packjson script配置process参数用的 与多页面配置无关 begin */
      'process.argv': JSON.stringify(process.argv.slice(2))
      /* 多页面配置修改 这里是用于packjson script配置process参数用的 与多页面配置无关 end */
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin()
    // https://github.com/ampedandwired/html-webpack-plugin
    /* 多页面配置修改 注释以下部分 begin */
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    /* 多页面配置修改 注释以下部分 end */
  ]
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      /* 多页面配置修改 生成多页面html begin */
      const pages = utils.getMultiEntry('./src/views/**/*.html');
      for (const pathname in pages) {
        // 配置生成的html文件，定义路径等
        const conf = {
          filename: pathname + '.html',
          template: pages[pathname], // 模板路径
          chunks: ['vendor', pathname], // 每个html引用的js模块
          inject: true, // js插入位置
          hash: true
        };
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
        devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
      }
      /* 多页面配置修改 生成多页面html end */

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            // messages: [`Your application is running here: http://${config.dev.host}:${port}`]
            messages: [
              `Your application is running here: http://localhost:${port}/${config.dev.defaultHtml}`
            ]
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined
        })
      );

      resolve(devWebpackConfig);
    }
  });
});
