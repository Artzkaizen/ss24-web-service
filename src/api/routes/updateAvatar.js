const { router, avatarSchema, validator, updateAvatar} = require('./_index');

router.put("/", validator.body(avatarSchema), updateAvatar)
module.exports = router;
