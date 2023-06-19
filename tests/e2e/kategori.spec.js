const supertest = require('supertest');
const {
    app
} = require('../app');
const {
    disconnect
} = require('../../src/database');
const {
    insertKategori,
    deleteKategori
} = require('../fixtures/kategori');
describe('tests/e2e/kategori.spec.js', () => {
    beforeEach(async () => {
        await deleteKategori();
        await insertKategori();
    });
    afterEach(async () => {
        await deleteKategori();
    });

    describe('GET /kategori', () => {
        it('should return statusCode 200 when request success', async () => {
            const kategori = await supertest(app).get('/kategori');
            expect(kategori.statusCode).toBe(200);
        });
    });
    describe('POST /kategori', () => {
        it('should return inserted kategori on uppercase when data inserted', async () => {
            const kategori = await supertest(app).post('/kategori').send({
                namaKategori: 'kategori5',
            });
            expect(kategori.statusCode).toBe(200);
            expect(kategori.body.data.namaKategori).toBe('KATEGORI5');
        });
        it('should return error kategori has created when data inserted', async () => {
            const kategori = await supertest(app).post('/kategori').send({
                namaKategori: 'KATEGORI2',
            });
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Kategori sudah ada');
        });
    });
    describe('GET /kategori/:id', () => {
        it('should return one kategori when data exists', async () => {
            const kategori = await supertest(app).get('/kategori/64871282407585f33503200c');
            expect(kategori.statusCode).toBe(200);
            expect(kategori.body.data).toHaveProperty('namaKategori');
            expect(kategori.body.data.namaKategori).toBe('kategori3');
        });
        it('should return not found error when data is not exists', async () => {
            const kategori = await supertest(app).get(
                '/kategori/64871282407585f33503200cnotfound'
            );
            expect(kategori.statusCode).toBe(404);
            expect(kategori.body.message).toBe('Kategori tidak ditemukan');
        });
    });
    describe('PUT /kategori/:id', () => {
        it('should return updated kategori on uppercase when data updated', async () => {
            const kategori = await supertest(app)
                .put('/kategori/64871282407585f33503200c')
                .send({
                    namaKategori: 'kategori edit',
                });
            expect(kategori.status).toBe(200);
            expect(kategori.body.data.namaKategori).toBe('KATEGORI EDIT');
        });
        it('should return error kategori has created when data inserted', async () => {
            const kategori = await supertest(app)
                .put('/kategori/64871289c0c87723dd4a18f0')
                .send({
                    namaKategori: 'KATEGORI2',
                });
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Kategori sudah ada');
        });
    });
    describe('DELETE /kategori/:id', () => {
        it('should delete one kategori', async () => {
            const kategori = await supertest(app).delete(
                '/kategori/64871282407585f33503200c'
            );
            expect(kategori.status).toBe(200);
            expect(kategori.body.message).toBe('Berhasil menghapus kategori');
        });
    });

    afterAll(async () => {
        await disconnect();
    });
});