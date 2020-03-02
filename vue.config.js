module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/freecodecamp-markdown-previewer/' : '/',

  outputDir: process.env.OUTPUT_DIR || 'dist',

  assetsDir: 'assets',

  css: {
    sourceMap: true,
  },

  configureWebpack: {
    output: {
      libraryExport: 'default',
    },
  },
};
