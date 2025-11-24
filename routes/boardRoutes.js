const {Router} = require('express');

const router = Router();

const controller = require('../controllers/boardController');

router.get('/', controller.boardGet);

// router.post('/new', controller.newMessagePost);


module.exports = router;