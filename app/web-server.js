const http = require('http');
const url = require('url');
const path = require('path');

const Koa = require('koa');
const KoaStatic = require('koa-static');
const Proxy = require('http-proxy');

const proxy = new Proxy({
  target: 'http://localhost:3000',
  changeOrigin: true
});

const static = new Koa();

static.use(KoaStatic(path.resolve(__dirname)));

const server = http.createServer({}, (req, res) => {
  const path = url.parse(req.url).pathname;
  const callback = static.callback();

  // Check if this is a /api route and forward to the API microservice
  if (/^\/api\/.*/.test(path)) {
    // Remove the /api
    req.url = req.url.slice(req.url.indexOf('/api') + 4);

    return proxy.web(req, res,{ }, (err) => {
      console.log(err);
    })
  }

  // If not an /api route, pass through to Koa static http server
  callback(req, res);
});

server.listen(8080);