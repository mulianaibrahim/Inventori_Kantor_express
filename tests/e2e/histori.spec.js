const supertest = require('supertest');
const {
    app
} = require('../app');
const {
    disconnect
} = require('../../src/database');
const {
    insertHistoriPenggunaan,
    deleteHistoriPenggunaan
} = require('../fixtures/histori');
const {
    deleteUser
} = require('../fixtures/user');

describe('tests/e2e/histori.spec.js', () => {
    let token = '';
    const data = {
        username: 'test',
        password: 'test',
        password_confirm: 'test',
        name: 'Tester',
    };
    beforeAll(async () => {
        await deleteHistoriPenggunaan();
        await insertHistoriPenggunaan();
        await supertest(app).post('/register').send(data);
        const auth = await supertest(app)
            .post('/login')
            .send({
                username: data.username,
                password: data.password
            });
        token = auth.body.data.token;
    });

    describe('GET /historiPenggunaan', () => {
        it('should return statusCode 200 when request success', async () => {
            const historiPenggunaan = await supertest(app)
                .get('/historiPenggunaan')
                .set('Authorization', token);
            expect(historiPenggunaan.statusCode).toBe(200);
        });
    });
    afterAll(async () => {
        await deleteHistoriPenggunaan();
        await deleteUser();
        await disconnect();
    });
});