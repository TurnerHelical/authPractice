const {Router} = require('express');

const router = Router();

const controller = require('../controllers/userController');

const {validateSignUp, validateLogin} = require('../middleware/validation');
const {ensureAuthenticated} = require('../middleware/auth');

router.get('/logIn', controller.logInPageGet);
router.post('/logIn',validateLogin, controller.logInPagePost);

router.get('/logOut', ensureAuthenticated, controller.logOutGet)

router.get('/signUp', controller.signUpPageGet);
router.post('/signUp', validateSignUp, controller.signUpPagePost);

router.get('/dash', ensureAuthenticated, controller.dashPageGet);

module.exports = router;