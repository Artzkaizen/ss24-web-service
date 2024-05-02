const {JwtStrategy, ExtractJwt} = require('./_index');

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
const jwtStrategy = new JwtStrategy(options,
    function(jwtPayload, done) {
        done(null, {
            username: jwtPayload.subject,
            name: jwtPayload.name,
            roles: jwtPayload.roles
        })
    }
);

module.exports = jwtStrategy;
