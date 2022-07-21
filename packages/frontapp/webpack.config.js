const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config) => {
  nrwlConfig(config);

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /zbar.wasm.bin$/,
          loader: 'file-loader',
          type: 'javascript/auto',
        },
      ],
    },
    experiments: {
      ...config.experiments,
      asyncWebAssembly: true,
    },
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        path: require.resolve('path-browserify'),
        fs: false,
      },
    },
  };
};
