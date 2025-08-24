const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'db'], // example: add custom asset
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'], // example: add cjs support
  },
};

module.exports = mergeConfig(defaultConfig, config);
