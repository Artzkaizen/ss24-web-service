const { fs, avatarFilePath, avatarFolderPath, ensureFolderAndFilesExist } = require('../_index');

const getAllAvatars = async(req, res) => {
    try {
        ensureFolderAndFilesExist(avatarFolderPath, avatarFilePath);
        const avatars = JSON.parse(await fs.promises.readFile(avatarFilePath));

        // avatars.length
        //     ? res.status(200).json({message:'All your avatars!', avatars})
        //     : res.status(200).json({message:'You dont have any avatars'})

        if (avatars && avatars.length) {
            res.status(200).json({ message: 'All your avatars!', avatars });
        } else if (avatars && !avatars.length) {
            res.status(200).json({ message: 'You don\'t have any avatars' });
        } else {
            // Handle the case where avatars is undefined or not an array
            res.status(200).json({ message: 'Avatars data is unavailable' });
        }

    } catch (err) {
        console.error('Error reading avatars:', err);
        res.status(500).send('Internal server error');
    }

}
const getOneAvatar = async(req, res) => {
    try {
        ensureFolderAndFilesExist(avatarFolderPath, avatarFilePath);
        const avatars = JSON.parse( await fs.promises.readFile(avatarFilePath));
        const foundAvatar = avatars.find(avatar => avatar.id === req.params.id);

        foundAvatar
            ? res.status(200).json({message: `Avatar found`, avatar: foundAvatar})
            : res.status(404).json({message: `Avatar not found`})

    } catch (err) {
        console.error('Error reading avatars:', err);
        res.status(500).send('Internal server error');
    }
}
module.exports = { getAllAvatars, getOneAvatar};