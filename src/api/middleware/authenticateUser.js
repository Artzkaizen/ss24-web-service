const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
    console.log('subject', req.user)
    try {
        const accessToken = jwt.sign({
                roles: req.user.roles,
                name: req.user.name,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                subject: req.user.username,
                expiresIn: '1d'
            }
        )
        res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        return res.status(200).send({accessToken});
    } catch (err) {
        console.error('Error reading user:', err);
        res.status(500).send('Internal server error');
    }
    next();
}

module.exports = authenticateUser;