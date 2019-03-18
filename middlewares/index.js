const compress = require('koa-compress');
const compose = require('koa-compose');

/* Compression middleware for html */
const compression = compress({
    filter(content_type) {
        return /text/i.test(content_type)
    },
    threshold: 1024,
    flush: require('zlib').constants.Z_SYNC_FLUSH
});

/* Error middleware for routes */
const errorHandling = async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            await ctx.render('error', {
                errorMessage: 'Page not found'
            });
        }
    } catch (e) {
        let errorMessage = '';

        switch (e.status) {
            case 400:
            case 404:
                errorMessage = 'Country not found';
                break;
            default:
                errorMessage = 'Something went wrong';
        }

        await ctx.render('error', {errorMessage});
    }
};

module.exports = compose([
    compression,
    errorHandling
]);