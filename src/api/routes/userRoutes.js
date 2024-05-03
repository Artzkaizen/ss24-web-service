const { router, createUser, handleLogin } = require('./_index');
const passport = require('passport');

// Create new user
router.post('/register', createUser);

// login user in
router.get('/login',passport.authenticate('basic', { session: false }), handleLogin);

module.exports = router;