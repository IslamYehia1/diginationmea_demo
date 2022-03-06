const CracoLessPlugin = require("craco-less");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@item-hover-bg": "none",
            },

            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

module.exports = function ({ env }) {
  const isProductionBuild = process.env.NODE_ENV === "production";
  const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE
    ? "server"
    : "json";

  const plugins = [];

  if (isProductionBuild) {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode }));
  }

  return {
    webpack: {
      plugins,
    },
  };
};
