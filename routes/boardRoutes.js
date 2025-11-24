const {Router} = require('express');

const router = Router();

const controller = require('../controllers/boardController');



router.post('/new', controller.newMessagePost);

router.get('/', controller.boardGet);


module.exports = router;