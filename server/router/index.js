const Router = require('express').Router;
const router = new Router();
const {body} = require('express-validator');
const UserController = require('../controllers/user-controller');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 16}),
    UserController.registration
);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

module.exports = router;