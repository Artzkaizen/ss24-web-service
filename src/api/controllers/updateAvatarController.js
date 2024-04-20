const { fs, avatarFilePath, avatarFolderPath, ensureFolderAndFilesExist } = require('./_index');

const updateAvatar = async (req, res)=>{
    try {
        ensureFolderAndFilesExist(avatarFolderPath, avatarFilePath);
        if(!fs.existsSync(avatarFilePath)) throw new Error('File does not exist');
        const updatedAvatar = req.body
        const avatars = JSON.parse(await fs.promises.readFile(avatarFilePath));

        const foundAvatarIndex = avatars.findIndex(avatar => avatar.id === req.params.id);

        foundAvatarIndex === -1 
            ? res.status(404).json({ message: `Avatar not found` })
            : avatars[foundAvatarIndex] = { ...avatars[foundAvatarIndex], ...updatedAvatar },
                await fs.promises.writeFile(avatarFilePath, JSON.stringify(avatars, null, 2)),
                res.status(200).json({ message: `Avatar Updated`, avatar: avatars[foundAvatarIndex] });

    }catch(err) {
        console.error('Error reading avatars:', err);
        res.status(500).send('Internal server error');
    }

}

module.exports = updateAvatar;