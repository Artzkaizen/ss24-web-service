const { v4: uuidv4 } = require('uuid');
class Avatar {
    constructor( avatarName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing) {
        this.id = uuidv4();
        this.avatarName = avatarName;
        this.childAge = +childAge;
        this.skinColor = skinColor;
        this.hairStyle = hairStyle;
        this.headShape = headShape;
        this.upperClothing = upperClothing;
        this.lowerClothing = lowerClothing;
        this.createdAt = new Date().toISOString();
    }
}
module.exports = Avatar;