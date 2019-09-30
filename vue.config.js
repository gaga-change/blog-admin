module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    https: false,
    open: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9876",
        changeOrigin: true
      }
    }
  }
};
