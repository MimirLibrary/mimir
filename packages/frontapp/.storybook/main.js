const rootMain = require('../../../.storybook/main');

module.exports = {
  ...rootMain,

  core: { ...rootMain.core, builder: 'webpack5' },

  stories: [
    ...rootMain.stories,
    '../src/app/**/*.stories.mdx',
    '../src/app/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  staticDirs: [{ from: '../src/assets', to: '/assets' }],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.js
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }
    // add your own webpack tweaks if needed
    config.module.rules.push({
      test: /zbar.wasm.bin$/,
      loader: 'file-loader',
      type: 'javascript/auto',
    });

    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        path: require.resolve('path-browserify'),
        fs: false,
      },
    };
    return config;
  },
  typescript: { reactDocgen: false },
};
