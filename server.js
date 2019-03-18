const hbs = require('koa-hbs');
const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-body');
const path = require('path');

const middlewares = require('./middlewares');
const router = require('./routes');

/* Init Koa instance */
const app = new Koa();

/* Parse body */
app.use(bodyParser());

/* Serve assets from folder */
app.use(serve(path.join(__dirname, '/public')));

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

/* Use port given from environment variable or the default */
const port = process.env.PORT || 3000;

/* Start server with given port */
app.listen(port);