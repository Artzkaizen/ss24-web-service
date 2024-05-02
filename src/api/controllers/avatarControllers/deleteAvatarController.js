const { fs, avatarFilePath, avatarFolderPath, ensureFolderAndFilesExist } = require('../_index');

const deleteAvatar = async (req, res) => {
    try {
        ensureFolderAndFilesExist(avatarFolderPath, avatarFilePath);
        const avatars = JSON.parse(await fs.promises.readFile(avatarFilePath));
        const foundAvatarIndex = avatars.findIndex(avatar => avatar.id === req.params.id);

        foundAvatarIndex === -1
            ? res.status(404).json({ message: `Avatar not found` })
            :  avatars.splice(foundAvatarIndex, 1),
                await fs.promises.writeFile(avatarFilePath, JSON.stringify(avatars, null, 2)),
                res.sendStatus(204);
    } catch (err) {
        console.error('Error reading avatars:', err);
        res.status(500).send('Internal server error');
    }
}

module.exports = deleteAvatar;