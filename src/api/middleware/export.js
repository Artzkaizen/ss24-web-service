const logger = require('./logReqs');
const jwtStrategy = require('./jwtStrategy');
const passportStrategy = require('./verifyUser');

module.exports = {
    logger,
    jwtStrategy,
    passportStrategy,
}