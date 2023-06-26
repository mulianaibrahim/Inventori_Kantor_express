const supertest = require('supertest');
const {
    app
} = require('../app');
const {
    disconnect
} = require('../../src/database');
const {
    insertLokasi,
    deleteLokasi
} = require('../fixtures/lokasi');
const {
    deleteUser
} = require('../fixtures/user');
describe('tests/e2e/lokasi.spec.js', () => {
    let token = '';
    const data = {
        username: 'test',
        password: 'test',
        password_confirm: 'test',
        name: 'Tester',
    };
    beforeAll(async () => {
        await deleteLokasi();
        await insertLokasi();
        await supertest(app).post('/register').send(data);
        const auth = await supertest(app)
            .post('/login')
            .send({
                username: data.username,
                password: data.password
            });
        token = auth.body.data.token;
    });

    describe('GET /lokasi', () => {
        it('should return statusCode 200 when request success', async () => {
            const lokasi = await supertest(app)
                .get('/lokasi')
                .set('Authorization', token);
            expect(lokasi.statusCode).toBe(200);
        });
    });
    describe('POST /lokasi', () => {
        it('should return inserted lokasi on uppercase when data inserted', async () => {
            const lokasi = await supertest(app)
                .post('/lokasi')
                .send({
                    namaLokasi: 'lokasi5',
                })
                .set('Authorization', token);
            expect(lokasi.statusCode).toBe(200);
            expect(lokasi.body.data.namaLokasi).toBe('LOKASI5');
        });
        it('should return error lokasi has created when data inserted', async () => {
            const lokasi = await supertest(app)
                .post('/lokasi')
                .send({
                    namaLokasi: 'LOKASI2',
                })
                .set('Authorization', token);
            expect(lokasi.statusCode).toBe(400);
            expect(lokasi.body.message).toBe('Nama lokasi penyimpanan sudah ada');
        });
    });
    describe('GET /lokasi/:id', () => {
        it('should return one lokasi when data exists', async () => {
            const lokasi = await supertest(app)
                .get('/lokasi/64871282407585f33503200c')
                .set('Authorization', token);
            expect(lokasi.statusCode).toBe(200);
            expect(lokasi.body.data).toHaveProperty('namaLokasi');
            expect(lokasi.body.data.namaLokasi).toBe('lokasi3');
        });
        it('should return not found error when data is not exists', async () => {
            const lokasi = await supertest(app)
                .get(
                    '/lokasi/64871282407585f33503200cnotfound'
                )
                .set('Authorization', token);
            expect(lokasi.statusCode).toBe(404);
            expect(lokasi.body.message).toBe('Lokasi penyimpanan tidak ditemukan');
        });
    });
    describe('PUT /lokasi/:id', () => {
        it('should return updated lokasi on uppercase when data updated', async () => {
            const lokasi = await supertest(app)
                .put('/lokasi/64871282407585f33503200c')
                .send({
                    namaLokasi: 'lokasi edit',
                })
                .set('Authorization', token);
            expect(lokasi.status).toBe(200);
            expect(lokasi.body.data.namaLokasi).toBe('LOKASI EDIT');
        });
        it('should return error lokasi has created when data inserted', async () => {
            const lokasi = await supertest(app)
                .put('/lokasi/64871289c0c87723dd4a18f0')
                .send({
                    namaLokasi: 'LOKASI2',
                })
                .set('Authorization', token);
            expect(lokasi.statusCode).toBe(400);
            expect(lokasi.body.message).toBe('Nama lokasi penyimpanan sudah ada');
        });
    });
    describe('DELETE /lokasi/:id', () => {
        it('should delete one lokasi', async () => {
            const lokasi = await supertest(app).delete(
                    '/lokasi/64871282407585f33503200c'
                )
                .set('Authorization', token);
            expect(lokasi.status).toBe(200);
            expect(lokasi.body.message).toBe('Berhasil menghapus lokasi penyimpanan');
        });
    });

    afterAll(async () => {
        await deleteLokasi();
        await deleteUser();
        await disconnect();
    });
});