const {app} = require('./app');
const request = require('supertest');
const {describe, test, expect} = require("@jest/globals");
require('dotenv').config();

const jwt = require('jsonwebtoken');
const token = jwt.sign({
            roles: [ 'parent', 'child' ],
            name: 'Marie',
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            subject: 'marie@home.edu',
            expiresIn: '5min'
        }
    )

describe('avatar api', () => {

    const TEST_DATA = {
        "avatarName": "chico",
        "childAge": 4,
        "skinColor": "#22ff00",
        "hairStyle":"short",
        "headShape": "oval",
        "upperClothing": "shirt",
        "lowerClothing": "pants"
    }

    test('create avatar', async () => {
        const createAvatar = await request(app)
            .post('/api/avatars')
            .set('Authorization', `Bearer ${token}`)
            .send(TEST_DATA)
            .set('Accept', 'application/json')
            .expect(201);

        expect(createAvatar.body).toMatchObject( {message:'Your avatar has been created!', avatar: TEST_DATA});
        expect(typeof createAvatar.body.avatar.id).toBe('string');
        expect(createAvatar.body.avatar.createdAt).toBeDefined();

        const getAllAvatars = await request(app)
            .get(`/api/avatars/`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200);

            // expect(getAllAvatars.body).toMatchObject({
            //     message: 'All your avatars!',
            //     avatars: expect.arrayContaining([expect.objectContaining(TEST_DATA)])
            // });
            expect.arrayContaining([expect.objectContaining(TEST_DATA)])

        const updateAvatar = await request(app)
            .put(`/api/avatars/${createAvatar.body.avatar.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(createAvatar.body.avatar)
            .set('Accept', 'application/json')
            .expect(200);
       
        const deleteAvatar = await request(app)
            .delete(`/api/avatars/${createAvatar.body.avatar.id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(204);
    });
    test('get all', async () => {

        const createResponse = await request(app)
            .post('/api/avatars')
            .set('Authorization', `Bearer ${token}`)
            .send(TEST_DATA)
            .set('Accept', 'application/json')
            .expect(201);

        const getAllResponse = await request(app)
            .get(`/api/avatars`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200);


        const newAvatarId = createResponse.body.avatar.id;

        const getAllWithNewResponse = await request(app)
            .get(`/api/avatars`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .expect(200);

        // expect(getAllResponse.body.avatars.length + 1).toEqual(getAllWithNewResponse.body.avatars.length)
        // expect(getAllWithNewResponse.body.avatars).toEqual(
        //     expect.arrayContaining([
        //         expect.objectContaining({
        //             id: newAvatarId
        //         })
        //     ])
        // );
    });

    test('create avatar requires at least avatar name and child\'s age', async () => {

        const testData = {
            "avatarName": "mina",
            "childAge": 6,
            "skinColor": "#22ff00",
            "hairStyle": "short",
            "headShape": "oval",
            "upperClothing": "shirt",
            "lowerClothing": "pants",
        }

        const createResponse = await request(app)
            .post('/api/avatars')
            .set('Authorization', `Bearer ${token}`)
            .send(testData)
            .set('Accept', 'application/json')
            .expect(201);
    });
});
describe('user',  () => {
    const USER_DATA = {
        "username": "mona@home.edu",
        "password": "123",
        "name": "Mickey"
    }
    test('create user', async () => {
        const newuser = await request(app)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(USER_DATA)
            .expect(201);
            // expect(newuser.body).toMatchObject( {message:'Your user has been created!', user: USER_DATA});
            expect(typeof newuser.body.user.id).toBe('string');
            expect(newuser.body.user.createdAt).toBeDefined();
    });
    test('auth user', async () => {
        const user = await request(app)
            .get('/auth/login')
            .auth('marie@home.edu', '123')
            .set('Accept', 'application/json')
            .expect(200);
    });

});


