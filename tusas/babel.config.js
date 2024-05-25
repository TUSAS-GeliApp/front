module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-react'
  ],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
    '@babel/plugin-syntax-jsx'
  ],
};


