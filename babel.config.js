module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
            "@compents": "./compoents",
          },
        },
      ],
      '@babel/plugin-proposal-export-namespace-from',
      "react-native-reanimated/plugin",
    ],
  };
};
