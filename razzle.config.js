'use strict';

const StartServerPlugin = require("start-server-webpack-plugin");

module.exports = {
  modifyWebpackConfig(opts) {
    const config = opts.webpackConfig;
    const options = opts.options.webpackOptions;

    if (opts.env.target === 'node') {
      config.entry.wsserver = ['src/ws.js'];

      if (opts.env.dev) {
        config.entry.wsserver.unshift(
          `${require.resolve('webpack/hot/poll')}?300`
        );

        // Pretty format server errors
        config.entry.wsserver.unshift(
          require.resolve('razzle-dev-utils/prettyNodeErrors')
        );

        console.log("***********", JSON.stringify(options.startServerOptions, null, 2));

        config.plugins.push(
          new StartServerPlugin(
            Object.assign(options.startServerOptions, {
              entryName: 'wsserver',
              verbose: true,
              debug: true,
              nodeArgs: [],
              killOnExist: true,
              killOnError: true,
            })
          )
        );
      }
    }

    return config;
  }
};