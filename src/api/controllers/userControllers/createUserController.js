const { fs, userFilePath, userFolderPath, ensureFolderAndFilesExist, User } = require('../_index');
const bcrypt = require('bcrypt');
const createUser = async (req, res) => {
    const { name, username, password, roles } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User( name, username, hashedPassword, roles);

    try {
        ensureFolderAndFilesExist(userFolderPath, userFilePath);
        const users = JSON.parse(await fs.promises.readFile(userFilePath));
        users.push(newUser)

        await fs.promises.writeFile(userFilePath, JSON.stringify(users, null, 2));
        return res.status(201).json({message:'Your user has been created!', user: newUser});
    } catch (err) {
        console.error('Error reading users:', err);
        res.status(500).send('Internal server error');
    }
}

module.exports = createUser;