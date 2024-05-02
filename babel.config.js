module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils/index.ts",
            "@hooks": "./src/hooks",
            "@context": "./src/context",
            "@apiServices": "./src/apiServices",
            "@features": "./features",
            "@assets": "./assets",
            "@store": "./store.ts",
          },
        },
      ],
    ],
  };
};
