module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "//cdn.yanjd.top/blog/admin/static/"
      : "/",
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
