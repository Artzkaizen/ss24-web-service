const { router, getAllAvatars, getOneAvatar } = require('./_index');

router.get('/', getAllAvatars);
router.get('/', getOneAvatar);
module.exports = router;
