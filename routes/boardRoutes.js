const {Router} = require('express');

const router = Router();

const controller = require('../controllers/boardController');

const {ensureAuthenticated} = require('../middleware/auth');



router.post('/new', ensureAuthenticated, controller.newMessagePost);

router.get('/delete/:id', ensureAuthenticated, controller.deleteMessageGet);

router.post('/update/:id', ensureAuthenticated, controller.updateMessagePost);

router.get('/', controller.boardGet);


module.exports = router;