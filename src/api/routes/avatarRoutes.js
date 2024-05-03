const {
    isParent,
    isChild,
    router,
    validator,
    avatarSchema,
    createAvatar,
    updateAvatar,
    deleteAvatar,
    getOneAvatar,
    getAllAvatars,
 } = require('./_index');

const passport = require('passport');
router.all('/', (req, res, next) => {
    next();
})
router.use(passport.authenticate('jwt', {session: false}))

router.route('/', )
    .post(isParent,validator.body(avatarSchema), createAvatar) // create avatar
    .get( isChild, getAllAvatars) // get all

router.route('/:id')
    .put(isParent, validator.body(avatarSchema), updateAvatar) // update avatar
    .delete(isParent, deleteAvatar) // delete avatar
    .get(isChild , getOneAvatar); // get one avatar]



module.exports = router;

