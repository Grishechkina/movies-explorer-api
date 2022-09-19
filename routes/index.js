const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { createUser, login, signout } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../validation/userValidation');

router.post('/signin', signinValidation, login);
router.post('/signup', signupValidation, createUser);
router.post('/signout', signout);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('/', () => {
  throw new NotFoundError('Данные не найдены или был запрошен несуществующий роут');
});

module.exports = router;
