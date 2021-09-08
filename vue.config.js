module.exports = {
    // publicPath: './',
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",   //解决动态路由传参时  因为history路由模式 导致的路径错误问题
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true,
        host: "0.0.0.0",
        // port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    }
}