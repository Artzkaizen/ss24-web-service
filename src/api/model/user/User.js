const { v4: uuidv4 } = require('uuid');
class User {
    constructor( name, username, password, roles ) {
        this.id = uuidv4();
        this.name = name;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.createdAt = new Date().toISOString();
    }
}
module.exports = User;