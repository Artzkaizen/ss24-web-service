const { router, deleteAvatar } = require('./_index');

router.delete('/', deleteAvatar);
module.exports = router;
