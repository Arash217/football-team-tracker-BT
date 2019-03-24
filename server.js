require('dotenv').config();
const hbs = require('koa-hbs');
const Koa = require('koa');
const serve = require('koa-static');
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('koa-body');
const path = require('path');

const middlewares = require('./middlewares');
const router = require('./routes');
const controller = require('./controllers');

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

hbs.registerHelper('output', function(partial, context) {
    // Create compiler function for said partial
    var output = Handlebars.compile(Handlebars.partials[partial]);
    // Return compiled output using said context
    return output(context);
});

/* Register all middleware */
app.use(middlewares);

/* Register all routes */
app.use(router.routes());

/* Allow all types of HTTP methods */
app.use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = socketIO(server);

/* Use port given from environment variable or the default */
const httpPort = process.env.HTTP_PORT || 3000;

/* Start server with given port */
server.listen(httpPort, () => console.log(`HTTP started on port ${httpPort}`));
io.on('connection', controller.socketHandler);