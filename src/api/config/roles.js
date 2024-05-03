const ROLE_PARENT = 'parent';
const ROLE_CHILD = 'child';

const isParent = (request, response, next) => {

    if (request.user && request.user.roles.includes(ROLE_PARENT)) {
        return next();
    } else {
        return response.status(401).send('Unauthorized');
    }
}
const isChild = (request, response, next) => {
    if (request.user && request.user.roles.includes(ROLE_CHILD)) {
        return next();
    } else {
        return response.status(401).send('Unauthorized');
    }
}
module.exports = { isChild, isParent }