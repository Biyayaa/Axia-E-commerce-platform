const router = require('express').Router();
const { register, login } = require('../controllers/userController');
const { validateRegister, validateLogin } = require('../validators/userValidator');


router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

module.exports = router;