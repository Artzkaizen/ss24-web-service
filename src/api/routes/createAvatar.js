const { router, avatarSchema, validator, createAvatar} = require('./_index');

router.post('/', validator.body(avatarSchema), createAvatar);
module.exports = router;
