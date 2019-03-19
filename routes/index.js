const Router = require('koa-router');
const controller = require('../controllers');

const router = new Router();

router.get('/', controller.home);
router.post('/dashboard', controller.addTeam);
router.get('/dashboard', controller.dashboard);
router.get('/match/:team', controller.match);

module.exports = router;