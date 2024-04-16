require('dotenv/config');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const model = require('../model/avatars.json')
const Avatar = require('../Avatar');



const port = process.env.PORT || 3000;
const filePath = path.join(__dirname, '..', 'models',  'avatars.json');
console.log(filePath)
app.use(express.staticpath.join(__dirname, 'public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Create
app.post('/api/avatars', (req, res) => {
    const { characterName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing } = req.body;
    const newAvatar = new Avatar(...req.body);
    console.log('hit')
    

    
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath);

            let avatars = JSON.parse(data);
            avatars.push(newAvatar);

            fs.writeFileSync(filePath, JSON.stringify(avatars, null, 2));
            res.status(201).json({message:'Your avatar has been created!', avatar: newAvatar});
        } else {
            fs.writeFileSync(filePath, JSON.stringify([newAvatar], null, 2));
            res.status(201).json({message:'Your avatar has been null!', avatar: newAvatar});
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal server error');
    }
});

// Read the avatars
app.get('/api/avatars', (req, res) => {
        try {
            if(!fs.existsSync(filePath)) throw new Error
            const data = fs.readFileSync(filePath);
            const avatars = JSON.parse(data);

            res.status(302).set('location', `/api/avatars/`).json({message:'All your avatars!', avatars});

        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
   
});
// Read the avatar
app.get('/api/avatars/:id', (req, res) => {
        try {
            if(!fs.existsSync(filePath)) throw new Error('File does not exist')
            const data = fs.readFileSync(filePath);
            const avatars = JSON.parse(data)

            const foundAvatar = avatars.find(avatar => avatar.id === +req.params.id);
            if (!foundAvatar) res.status(404).json({message: `Avatar not found`});
            res.status(302).set('location', `/api/avatars/${foundAvatar.id}`).json({message: `Avatar found`, avatars: foundAvatar});
        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
   
});

// update avatar
app.put('/api/avatars/:id', async (req, res) => {
        try {
            if(!fs.existsSync(filePath)) throw new Error
            const data =  fs.readFileSync(filePath);
            const avatars = JSON.parse(data);
            const { characterName, childAge, skinColor, hairStyle, headShape, upperClothing, lowerClothing } = req.body;
            const foundAvatar = avatars.find(avatar => avatar.id === +req.params.id);
            const foundAvatarIndex = avatars.findIndex(avatar => avatar.id === +req.params.id);

            if (foundAvatarIndex === -1) {
                return res.status(404).json({ message: `Avatar not found` });
            }
    
            // Update the avatar's properties
            const updatedAvatar = {
                ...foundAvatar,
                characterName,
                childAge,
                skinColor,
                hairStyle,
                headShape,
                upperClothing,
                lowerClothing,
            };



            // Rewrite the updated avatar to the file
             fs.writeFileSync(filePath, JSON.stringify(avatars, null, 2));

            // Respond with updated avatar
            res.status(200).json({ message: `Avatar details updated`, avatar: updatedAvatar})
        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
   
});

// delete avatar
app.delete('/api/avatars/:id', async (req, res) => {
        try {
            if(!fs.existsSync(filePath)) throw new Error
            const data = await fs.readFileSync(filePath);
            const avatars = JSON.parse(data);

            const foundAvatarIndex = avatars.findIndex(avatar => avatar.id === +req.params.id);
            avatars.splice(foundAvatarIndex, 1);
            await fs.writeFileSync(filePath, JSON.stringify(avatars, null, 2));
            
            res.status(204).json({message: 'Avatar deleted successfully'})
        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
   
});

module.exports = { app, port };
