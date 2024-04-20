const { fs, avatarFilePath, avatarFolderPath, ensureFolderAndFilesExist, Avatar } = require('./_index');

const createAvatar = async (req, res) => {
    const { avatarName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing } = req.body;
    const newAvatar = new Avatar( avatarName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing);

    try {
        ensureFolderAndFilesExist(avatarFolderPath, avatarFilePath);
        const avatars = JSON.parse(await fs.promises.readFile(avatarFilePath));
        avatars.push(newAvatar);

        await fs.promises.writeFile(avatarFilePath, JSON.stringify(avatars, null, 2));
        return res.status(201).set("Location", `/api/avatars/${newAvatar.id}`).json({message:'Your avatar has been created!', avatar: newAvatar});
        
    } catch (err) {
        console.error('Error reading avatars:', err);
        res.status(500).send('Internal server error');
    }
}

module.exports = createAvatar;