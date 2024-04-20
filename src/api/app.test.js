const {app} = require('./app');
const request = require('supertest');
const {describe, test, expect} = require("@jest/globals");

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
            .send(TEST_DATA)
            .set('Accept', 'application/json')
            .expect(201);

        expect(createAvatar.body).toMatchObject( {message:'Your avatar has been created!', avatar: TEST_DATA});
        expect(typeof createAvatar.body.avatar.id).toBe('string');
        expect(createAvatar.body.avatar.createdAt).toBeDefined();

        const getAllAvatars = await request(app)
            .get(`/api/avatars/`)
            .set('Accept', 'application/json')
            .expect(200);

            expect(getAllAvatars.body).toMatchObject({
                message: 'All your avatars!',
                avatars: expect.arrayContaining([expect.objectContaining(TEST_DATA)])
            });

        const updateAvatar = await request(app)
            .put(`/api/avatars/${createAvatar.body.avatar.id}`)
            .send(createAvatar.body.avatar)
            .set('Accept', 'application/json')
            .expect(200);
       
        const deleteAvatar = await request(app)
            .delete(`/api/avatars/${createAvatar.body.avatar.id}`)
            .set('Accept', 'application/json')
            .expect(204);
    });
    test('get all', async () => {

        const getAllResponse = await request(app)
            .get(`/api/avatars`)
            .set('Accept', 'application/json')
            .expect(200);

        const createResponse = await request(app)
            .post('/api/avatars')
            .send(TEST_DATA)
            .set('Accept', 'application/json')
            .expect(201);

        const newAvatarId = createResponse.body.avatar.id;

        const getAllWithNewResponse = await request(app)
            .get(`/api/avatars`)
            .set('Accept', 'application/json')
            .expect(200);

        expect(getAllResponse.body.avatars.length + 1).toEqual(getAllWithNewResponse.body.avatars.length)
        expect(getAllWithNewResponse.body.avatars).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: newAvatarId
                })
            ])
        );
    });

    test('create avatar requires at least avatar name and child\'s age', async () => {

        const testData = {
            "id": "c8b0231a-1b05-4e6e-8093-c1692e5f45a8",
            "avatarName": "mina",
            "childAge": 6,
            "skinColor": "#22ff00",
            "hairStyle": "short",
            "headShape": "oval",
            "upperClothing": "shirt",
            "lowerClothing": "pants",
            "createdAt": "2024-04-19T16:43:35.221Z"
        }

        const createResponse = await request(app)
            .post('/api/avatars')
            .send(testData)
            .set('Accept', 'application/json')
            .expect(201);
    });
});
// describe('validate data', () => {

    
// });
