const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/home', homeRoutes);
router.use('/dash', dashboardRoutes);

module.exports = router;
