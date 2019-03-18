const path = require('path');
const http2 = require('http2');
const hbs = require('koa-hbs');
const serve = require('koa-static');
const Koa = require('koa');

const middlewares = require('./middlewares');
const router = require('./routes');
const certificate = require('./config/certificate');

/* Init Koa instance */
const app = new Koa();

/* Serve assets from folder */
app.use(serve(path.join(__dirname, '/public'), {
    setHeaders(res) {
        res.setHeader('cache-control', 'public, max-age=31536000');
    }
}));

/* Templating engine configuration */
app.use(hbs.middleware({
    viewPath: path.join(__dirname, '/views'),
    partialsPath: path.join(__dirname, 'views/partials')
}));

/* Register all middleware */
app.use(middlewares);

/* Register all routes */
app.use(router.routes());

/* Allow all types of HTTP methods */
app.use(router.allowedMethods());

/* Start a http2 server with given certificate */
const server = http2.createSecureServer(certificate, app.callback());

/* Use port given from environment variable or the default */
const port = process.env.PORT || 3000;

/* Start server with given port */
server.listen(port,() => console.log(`App started on port ${port}`));