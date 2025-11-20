const { Router } = require('express');

const router = Router();

const homeRoutes = require('../routes/homeRoutes.js');
const userRoutes = require('../routes/userRoutes');
const boardRoutes = require('../routes/boardRoutes');

router.use('/', homeRoutes);
router.use('/user', userRoutes);
router.use('/board', boardRoutes);

module.exports = router;