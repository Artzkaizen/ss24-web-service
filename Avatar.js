class Avatar {
    constructor( characterName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing) {
        this.id = Math.floor(Math.random() * 10000 + 1);
        this.characterName = characterName;
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