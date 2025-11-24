const {Router} = require('express');

const router = Router();

const controller = require('../controllers/userController');

router.get('/logIn', controller.logInPageGet);
router.post('/logIn', controller.logInPagePost);

router.get('/logOut', controller.logOutGet)

router.get('/signUp', controller.signUpPageGet);
router.post('/signUp', controller.signUpPagePost);

router.get('/dash', controller.dashPageGet);

module.exports = router;