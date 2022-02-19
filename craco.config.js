const CracoLessPlugin = require("craco-less");

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
