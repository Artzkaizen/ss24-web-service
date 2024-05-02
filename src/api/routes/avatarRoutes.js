const {
    router,
    validator,
    avatarSchema,
    createAvatar,
    updateAvatar,
    deleteAvatar,
    getOneAvatar,
    getAllAvatars,
 } = require('./_index')

 // Creates a new avatar
router.post('/', validator.body(avatarSchema), createAvatar);
// Update an existing avatar
router.put('/:id', validator.body(avatarSchema), updateAvatar);
// Delete an avatar
router.delete('/:id', deleteAvatar);
// Get all avatars
router.get('/', getAllAvatars);
// Get a single avatar
router.get('/:id', getOneAvatar);

module.exports = router;
