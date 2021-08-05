const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/graphql',
    createProxyMiddleware({
      target: process.env.SENSU_API_URL,
      changeOrigin: true,
    })
  );
};