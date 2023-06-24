const supertest = require('supertest');
const {
    app
} = require('../app');
const {
    disconnect
} = require('../../src/database');
const {
    insertBarang,
    deleteBarang
} = require('../fixtures/barang');
const {
    insertKategori,
    deleteKategori
} = require('../fixtures/kategori');
const {
    insertLokasi,
    deleteLokasi
} = require('../fixtures/lokasi');
const {
    deleteUser
} = require('../fixtures/user');
describe('tests/e2e/barang.spec.js', () => {
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
    beforeEach(async () => {
        await insertKategori();
        await insertLokasi();
        await insertBarang();
    });
    afterEach(async () => {
        await deleteBarang();
        await deleteKategori();
        await deleteLokasi();
    });

    describe('GET /barang', () => {
        it('should return statusCode 200 when request success', async () => {
            const barang = await supertest(app)
                .get('/barang')
                .set('Authorization', token);
            expect(barang.statusCode).toBe(200);
        });
    });
    describe('POST /barang', () => {
        it('should return inserted barang when data inserted', async () => {
            const barang = await supertest(app)
                .post('/barang')
                .send({
                    namaBarang: "barang 1",
                    kategori: "64871289c0c87723dd4a18f0",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "64871289c0c87723dd4a18f0",
                })
                .set('Authorization', token);
            expect(barang.statusCode).toBe(200);
            expect(barang.body.data.namaBarang).toBe('BARANG 1');
            expect(barang.body.data.kategori).toBe('64871289c0c87723dd4a18f0');
            expect(barang.body.data.tanggalPerolehan).toBe('2022-05-02');
            expect(barang.body.data.hargaPerolehan).toBe(100000);
            expect(barang.body.data.masaGuna).toBe('12 BULAN');
            expect(barang.body.data.kondisi).toBe('BAIK');
            expect(barang.body.data.lokasi).toBe('64871289c0c87723dd4a18f0');
            expect(barang.body.data.penggunaSaatIni).toBe(null);
            expect(barang.body.data).toHaveProperty('kodeBarang');
        });
        it('should return error if kategori missing when data inserted', async () => {
            const kategori = await supertest(app)
                .post('/barang')
                .send({
                    namaBarang: "barang 1",
                    kategori: "6486ef6fdc1c04hc3458c1d54",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "64871289c0c87723dd4a18f0",
                })
                .set('Authorization', token);
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Kategori tersebut tidak ada');
        });
        it('should return error if lokasi penyimpanan missing when data inserted', async () => {
            const kategori = await supertest(app)
                .post('/barang')
                .send({
                    namaBarang: "barang 1",
                    kategori: "6486ef78dc1c04f730a2c1d2",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "6486ef6fdb1b87f73458c1b6",
                })
                .set('Authorization', token);
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Lokasi penyimpanan tersebut tidak ada');
        });
    });
    describe('GET /barang/:id', () => {
        it('should return one barang when data exists', async () => {
            const barang = await supertest(app)
                .get('/barang/64871282407585f33503200c')
                .set('Authorization', token);
            expect(barang.statusCode).toBe(200);
            expect(barang.body.data[0]).toHaveProperty('namaBarang');
            expect(barang.body.data[0]).toHaveProperty('kategori');
            expect(barang.body.data[0]).toHaveProperty('tanggalPerolehan');
            expect(barang.body.data[0]).toHaveProperty('hargaPerolehan');
            expect(barang.body.data[0]).toHaveProperty('masaGuna');
            expect(barang.body.data[0]).toHaveProperty('kondisi');
            expect(barang.body.data[0]).toHaveProperty('lokasi');
            expect(barang.body.data[0]).toHaveProperty('penggunaSaatIni');
            expect(barang.body.data[0]).toHaveProperty('kodeBarang');
            expect(barang.body.data[0].namaBarang).toBe('TES');
            expect(barang.body.data[0].kategori).toBe('KATEGORI2');
            expect(barang.body.data[0].tanggalPerolehan).toBe('2022-05-02T00:00:00.000Z');
            expect(barang.body.data[0].hargaPerolehan).toBe(100000);
            expect(barang.body.data[0].masaGuna).toBe('12 BULAN');
            expect(barang.body.data[0].kondisi).toBe('BAIK');
            expect(barang.body.data[0].lokasi).toBe('lokasi3');
            expect(barang.body.data[0].penggunaSaatIni).toBe(null);
            expect(barang.body.data[0].kodeBarang).toBe('544244');
        });
        it('should return not found error when data is not exists', async () => {
            const barang = await supertest(app)
                .get(
                    '/barang/64871282407585f33503200cnotfound'
                )
                .set('Authorization', token);
            expect(barang.statusCode).toBe(404);
            expect(barang.body.message).toBe('Barang tidak ditemukan');
        });
    });
    describe('PUT /barang/:id', () => {
        it('should return updated barang when data updated', async () => {
            const barang = await supertest(app)
                .put('/barang/64871282407585f33503200c')
                .send({
                    namaBarang: "barang 1 edit",
                    kategori: "64871289c0c87723dd4a18f0",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "64871289c0c87723dd4a18f0",
                })
                .set('Authorization', token);
            expect(barang.status).toBe(200);
            expect(barang.body.data).toHaveProperty('namaBarang');
            expect(barang.body.data).toHaveProperty('kategori');
            expect(barang.body.data).toHaveProperty('tanggalPerolehan');
            expect(barang.body.data).toHaveProperty('hargaPerolehan');
            expect(barang.body.data).toHaveProperty('masaGuna');
            expect(barang.body.data).toHaveProperty('kondisi');
            expect(barang.body.data).toHaveProperty('lokasi');
            expect(barang.body.data.namaBarang).toBe('BARANG 1 EDIT');
            expect(barang.body.data.kategori).toBe('64871289c0c87723dd4a18f0');
            expect(barang.body.data.tanggalPerolehan).toBe('2022-05-02');
            expect(barang.body.data.hargaPerolehan).toBe(100000);
            expect(barang.body.data.masaGuna).toBe('12 BULAN');
            expect(barang.body.data.kondisi).toBe('BAIK');
            expect(barang.body.data.lokasi).toBe('64871289c0c87723dd4a18f0');
        });
        it('should return error if kategori missing when data inserted', async () => {
            const kategori = await supertest(app)
                .put('/barang/64871282407585f33503200c')
                .send({
                    namaBarang: "barang 1 edit",
                    kategori: "6486ef6fdb1b04f71788c1d0",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "64871289c0c87723dd4a18f0",
                })
                .set('Authorization', token);
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Kategori tersebut tidak ada');
        });
        it('should return error if lokasi penyimpanan missing when data inserted', async () => {
            const kategori = await supertest(app)
                .put('/barang/64871282407585f33503200c')
                .send({
                    namaBarang: "barang 1",
                    kategori: "64871289c0c87723dd4a18f0",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "6486ef6fdb1jldg73458c1d0",
                })
                .set('Authorization', token);
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Lokasi penyimpanan tersebut tidak ada');
        });
    });
    describe('DELETE /barang/:id', () => {
        it('should delete one barang', async () => {
            const barang = await supertest(app).delete(
                    '/barang/64871282407585f33503200c'
                )
                .set('Authorization', token);
            expect(barang.status).toBe(200);
            expect(barang.body.message).toBe('Berhasil menghapus Barang');
        });
    });

    afterAll(async () => {
        await deleteUser();
        await disconnect();
    });
});