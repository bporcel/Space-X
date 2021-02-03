module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
              @import "@/styles/_variables.scss";
            `,
      },
    },
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/hangar'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
};
