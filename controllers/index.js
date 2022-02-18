const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');
const api = require('./api');

router.use('/api', api);
router.use('/', homeRoutes);
router.use('/dash', dashboardRoutes);

module.exports = router;
