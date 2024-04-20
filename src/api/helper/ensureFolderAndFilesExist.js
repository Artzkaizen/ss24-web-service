const fs = require('fs');

const ensureFolderAndFilesExist = async (folderPath, filePath) => {
    try {
        if (!fs.existsSync(folderPath)) {
            await fs.promises.mkdir(folderPath);
            console.log(folderPath, 'folder created');
        }
        if (!fs.existsSync(filePath)) {
            await fs.promises.writeFile(filePath, '[]');
            console.log(filePath, 'file created');
        }
    } catch (err) {
        console.error('Error creating logs folder and file:', err);
    }
};

module.exports = ensureFolderAndFilesExist;

