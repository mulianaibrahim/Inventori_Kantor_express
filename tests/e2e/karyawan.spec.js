const supertest = require('supertest');
const {
    app
} = require('../app');
const {
    disconnect
} = require('../../src/database');
const {
    insertKaryawan,
    deleteKaryawan
} = require('../fixtures/karyawan');
const {
    deleteUser
} = require('../fixtures/user');

describe('tests/e2e/karyawan.spec.js', () => {
    let token = '';
    const data = {
        username: 'test',
        password: 'test',
        password_confirm: 'test',
        name: 'Tester',
    };
    beforeAll(async () => {
        await supertest(app).post('/register').send(data);
        const auth = await supertest(app)
            .post('/login')
            .send({
                username: data.username,
                password: data.password
            });
        token = auth.body.data.token;
    });
    afterAll(async () => {
        await deleteUser();
    });
    beforeEach(async () => {
        await deleteKaryawan();
        await insertKaryawan();
    });
    afterEach(async () => {
        await deleteKaryawan();
    });

    describe('GET /karyawan', () => {
        it('should return statusCode 200 when request success', async () => {
            const karyawan = await supertest(app)
                .get('/karyawan')
                .set('Authorization', token);
            expect(karyawan.statusCode).toBe(200);
        });
    });
    describe('POST /karyawan', () => {
        it('should return inserted karyawan on uppercase when data inserted', async () => {
            const karyawan = await supertest(app)
                .post('/karyawan')
                .send({
                    namaKaryawan: 'Karyawan 5',
                })
                .set('Authorization', token);
            expect(karyawan.statusCode).toBe(200);
            expect(karyawan.body.data.namaKaryawan).toBe('KARYAWAN 5');
        });
        it('should return error karyawan has created when data inserted', async () => {
            const karyawan = await supertest(app)
                .post('/karyawan')
                .send({
                    namaKaryawan: 'KARYAWAN 2',
                })
                .set('Authorization', token);
            expect(karyawan.statusCode).toBe(500);
            expect(karyawan.body.message).toBe('Karyawan sudah ada');
        });
    });
    describe('GET /karyawan/:id', () => {
        it('should return one karyawan when data exists', async () => {
            const karyawan = await supertest(app)
                .get('/karyawan/64871282407585f33503200c')
                .set('Authorization', token);
            expect(karyawan.statusCode).toBe(200);
            expect(karyawan.body.data).toHaveProperty('namaKaryawan');
            expect(karyawan.body.data.namaKaryawan).toBe('Karyawan 3');
        });
        it('should return not found error when data is not exists', async () => {
            const karyawan = await supertest(app)
                .get('/karyawan/64871282407585f33503200cnotfound')
                .set('Authorization', token);
            expect(karyawan.statusCode).toBe(404);
            expect(karyawan.body.message).toBe('Karyawan tidak ditemukan');
        });
    });
    describe('PUT /karyawan/:id', () => {
        it('should return updated karyawan on uppercase when data updated', async () => {
            const karyawan = await supertest(app)
                .put('/karyawan/64871282407585f33503200c')
                .send({
                    namaKaryawan: 'karyawan edit',
                })
                .set('Authorization', token);
            expect(karyawan.status).toBe(200);
            expect(karyawan.body.data.namaKaryawan).toBe('KARYAWAN EDIT');
        });
        it('should return error karyawan has created when data inserted', async () => {
            const karyawan = await supertest(app)
                .put('/karyawan/64871289c0c87723dd4a18f0')
                .send({
                    namaKaryawan: 'KARYAWAN 2',
                }).set('Authorization', token);
            expect(karyawan.statusCode).toBe(500);
            expect(karyawan.body.message).toBe('Karyawan sudah ada');
        });
    });
    describe('DELETE /karyawan/:id', () => {
        it('should delete one karyawan', async () => {
            const karyawan = await supertest(app).delete(
                '/karyawan/64871282407585f33503200c'
            ).set('Authorization', token);
            expect(karyawan.status).toBe(200);
            expect(karyawan.body.message).toBe('Berhasil menghapus karyawan');
        });
    });

    afterAll(async () => {
        await disconnect();
    });
});