const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

const ensureFolderAndFilesExist = require('../helper/ensureFolderAndFilesExist');

const logsFolderPath = path.join(__dirname, '..', 'logs');
const logsFilePath = path.join(logsFolderPath, 'reqLog.json');

const logReqs = async (message) => {
    await ensureFolderAndFilesExist(logsFolderPath, logsFilePath);

    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const log = {
        ...message,
        timestamp,
        uuid: uuid()
    }

    try {
        const logs = JSON.parse(await fs.promises.readFile(logsFilePath, "utf-8"))
        logs.push(log);

        await fs.promises.writeFile(logsFilePath, JSON.stringify(logs, null, 2));
    } catch (err) {
        console.error('Error logging events:', err);
    }
};

const logger = (req, res, next) => {
    const { method, headers, url} = req
    const logMessage = {
        method,
        origin: headers.origin,
        url
    };
    logReqs(logMessage);
    next();
};

module.exports =  logger;