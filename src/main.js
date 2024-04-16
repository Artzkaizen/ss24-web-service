require('dotenv/config');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const Avatar = require('../Avatar');


const port = process.env.PORT || 3000;
app.use(express.static( __dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/create-avatar', async (req, res) => {
    const { name, age, skinColor, hairStyle, headShape, upperClothing, lowerClothing } = req.body;
    const newAvatar = new Avatar(name, age, skinColor, hairStyle, headShape, upperClothing, lowerClothing);
    
    // const filePath = 'avatars.json';
    const filePath = path.join(__dirname, 'public', 'avatars.json');

    
    try {
        if (fs.existsSync(filePath)) {
            const data = await fs.promises.readFileSync(filePath);

            let avatars = JSON.parse(data);
            avatars.push(newAvatar);

            await fs.promises.writeFile(filePath, JSON.stringify(avatars, null, 2));
            res.send('Your avatar has been created!');
        } else {
            await fs.promises.writeFile(filePath, JSON.stringify([newAvatar], null, 2));
            res.send('Your avatar has been created!');
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal server error');
    }
});

app.get('/avatars', async (req, res) => {
    const filePath = path.join(__dirname, 'public', 'avatars.json');
        try {
            if(!fs.existsSync(filePath)) throw new Error
            const data = await fs.readFileSync(filePath);
            const avatars = JSON.parse(data);

            const avatarListItems = avatars.map(avatar => `<li>${avatar.characterName}</li>`).join('');
            avatars.length ?  res.send(`<ul>${avatarListItems}</ul>`) : res.send('No avatars found')
        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
   
});
app.get('/avatars/:id', async (req, res) => {
    const filePath = 'avatars.json';
        try {
            if(!fs.existsSync(filePath)) throw new Error
            const data = await fs.readFileSync(filePath);
            const avatars = JSON.parse(data)
            const { 
                characterName, childAge, skinColor, hairStyle, headShape, upperClothing,lowerClothing
             } = avatars.find(avatar => avatar.id === +req.params.id);
            const avatarDetailsTable = `
                <table>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Skin Color</th>
                    <th>Hair Style</th>
                    <th>Head Shape</th>
                    <th>Upper Clothing</th>
                    <th>Lower Clothing</th>
                </tr>
                <tr>
                    <td>${characterName}</td>
                    <td>${childAge}</td>
                    <td>${skinColor}</td>
                    <td>${hairStyle}</td>
                    <td>${headShape}</td>
                    <td>${upperClothing}</td>
                    <td>${lowerClothing}</td>
                </tr>
            </table>
            `
            res.status(200).send(`<div>${avatarDetailsTable}</div>`);
        } catch (err) {
            console.error('Error reading avatars:', err);
            res.status(500).send('Internal server error');
        }
   
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));

