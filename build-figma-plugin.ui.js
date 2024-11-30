module.exports = (buildOptions) => ({
  ...buildOptions,
  define: {
    global: 'window',
  },
});
