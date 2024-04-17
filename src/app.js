require('dotenv/config');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const model = require('../model/avatars.json')
const Avatar = require('../Avatar');

const port = process.env.PORT || 3000;
const filePath = path.join(__dirname, '..', 'model',  'avatars.json');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Create
app.post('/api/avatars', (req, res) => {
    const { characterName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing } = req.body;
    const newAvatar = new Avatar(characterName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing);
    
    try {
        if (fs.existsSync(filePath)) {
            const avatars = JSON.parse(fs.readFileSync(filePath));
            avatars.push(newAvatar);

            fs.writeFileSync(filePath, JSON.stringify(avatars, null, 2));
            res.status(201).set("Location", `/api/avatars/${newAvatar.id}`).json({message:'Your avatar has been created!', avatar: newAvatar});
        } else {
            fs.writeFileSync(filePath, JSON.stringify([newAvatar], null, 2));
            res.status(201).set("Location", `/api/avatars/${newAvatar.id}`).json({message:'Your avatar has been created!', avatar: newAvatar});
        }
    } catch (err) {
        // res.send(500, 'Error reading avatars:', err);
        console.error('Error reading avatars:', err);
        res.status(500).send('Internal server error');
    }
    
});

// Read the avatars
app.get('/api/avatars', (req, res) => {
        try {
            if(!fs.existsSync(filePath)) throw new Error
            const avatars = JSON.parse(fs.readFileSync(filePath));

            res.status(302).json({message:'All your avatars!', avatars});

        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
   
});
// Read the avatar
app.get('/api/avatars/:id', (req, res) => {
        try {
            if(!fs.existsSync(filePath)) throw new Error('File does not exist');
            const avatars = JSON.parse(fs.readFileSync(filePath));

            const foundAvatar = avatars.find(avatar => avatar.id === +req.params.id);
            foundAvatar
                ? res.status(302).set('location', `/api/avatars/${foundAvatar.id}`).json({message: `Avatar found`, avatars: foundAvatar})
                : res.status(404).json({message: `Avatar not found`})
        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
});

// Update avatar
app.put("/api/avatars/:id", (req, res)=>{
    try {
            if(!fs.existsSync(filePath)) throw new Error('File does not exist');
        const updatedParams = req.body
        const avatars = JSON.parse(fs.readFileSync(filePath));
        const foundAvatar = avatars.find(avatar => avatar.id === +req.params.id);

        foundAvatar
            ? avatars[avatars.indexOf(foundAvatar)] = {...foundAvatar, ...updatedParams}
            : res.status(404).json({message: `Avatar not found`});
        
        fs.writeFileSync(filePath, JSON.stringify(avatars, null, 2));
        res.status(200).json({message: `Avatar Updated`, avatar: foundAvatar})
    }catch(err) {
        console.error('Error reading avatars:', err);
        res.status(500).send('Internal server error');
    }

})

// delete avatar
app.delete('/api/avatars/:id', (req, res) => {
        try {
            if(!fs.existsSync(filePath)) throw new Error('File does not exist');
            const avatars = JSON.parse(fs.readFileSync(filePath));

            const foundAvatarIndex = avatars.findIndex(avatar => avatar.id === +req.params.id);
            foundAvatarIndex === -1 && res.status(404).json({ message: `Avatar not found` });

            avatars.splice(foundAvatarIndex, 1);
            fs.writeFileSync(filePath, JSON.stringify(avatars, null, 2));
            
            res.status(204).json({message: 'Avatar deleted successfully'})
        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
});

module.exports = { app, port };
