const { fs, avatarFilePath, avatarFolderPath, ensureFolderAndFilesExist } = require('../_index');

const getAllAvatars = async(req, res) => {
    try {
        ensureFolderAndFilesExist(avatarFolderPath, avatarFilePath);
        const avatars = JSON.parse(await fs.promises.readFile(avatarFilePath));

        // avatars.length
        //     ? res.status(200).json({message:'All your avatars!', avatars})
        //     : res.status(200).json({message:'You dont have any avatars'})

        const { page = 1, size = 5 } = req.query

        // Paginate the avatars based on the requested page and size
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + parseInt(size);
        const paginatedAvatars = avatars.slice(startIndex, endIndex);

        res.status(200).json(paginatedAvatars);

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