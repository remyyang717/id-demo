const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app)
{
    // 将所有请求以 /api 为前缀的请求代理到目标 API 服务器
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.nz.processr.io', // 目标 API 服务器的 URL
            changeOrigin: true,                  // 修改请求头中的 origin
        })
    );
};
