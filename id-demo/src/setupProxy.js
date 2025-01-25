const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app)
{
    app.use(
        '/api/hilltop',
        createProxyMiddleware({
            target: 'https://envirodata.horizons.govt.nz',
            changeOrigin: true,
        })
    );

    app.use(
        '/api/v1/DataPoints/',
        createProxyMiddleware({
            target: 'https://api.nz.processr.io',
            changeOrigin: true,
        })
    );


};
