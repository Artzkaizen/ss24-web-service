const { fs, BasicStrategy, bcrypt, userFilePath }= require('./_index')

const passportStrategy = new BasicStrategy(
    async function (userid, password, done) {
        try {
            const users = JSON.parse(await fs.promises.readFile(userFilePath));
            const foundUser = users.find(user => user.username === userid);
            if (foundUser) {
                const isValid = await bcrypt.compare(password, foundUser.password);
                isValid ? done(null, foundUser) : done(null, password);
            } else {
                done(null, false);
            }
        } catch (err) {
            done(err);
        }
    }
)
module.exports = passportStrategy;