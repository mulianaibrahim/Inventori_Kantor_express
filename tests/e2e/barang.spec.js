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
    deleteKategori
} = require('../fixtures/kategori');
const {
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
        await supertest(app)
            .post('/kategori')
            .send({
                namaKategori: 'kategori1',
            })
            .set('Authorization', token);
        await supertest(app)
            .post('/lokasi')
            .send({
                namaLokasi: 'lokasi1',
            })
            .set('Authorization', token);
    });
    afterAll(async () => {
        await deleteKategori();
        await deleteUser();
    });
    beforeEach(async () => {
        await deleteBarang();
        await insertBarang();
    });
    afterEach(async () => {
        await deleteBarang();
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
                    kategori: "kategori1",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "lokasi1",
                })
                .set('Authorization', token);
            expect(barang.statusCode).toBe(200);
            expect(barang.body.data.namaBarang).toBe('BARANG 1');
            expect(barang.body.data.kategori).toBe('KATEGORI1');
            expect(barang.body.data.tanggalPerolehan).toBe('2022-05-02');
            expect(barang.body.data.hargaPerolehan).toBe(100000);
            expect(barang.body.data.masaGuna).toBe('12 BULAN');
            expect(barang.body.data.kondisi).toBe('BAIK');
            expect(barang.body.data.lokasi).toBe('LOKASI1');
            expect(barang.body.data).toHaveProperty('kodeBarang');
            expect(barang.body.data).toHaveProperty('penggunaSaatIni');
        });
        it('should return error if kategori missing when data inserted', async () => {
            const kategori = await supertest(app)
                .post('/barang')
                .send({
                    namaBarang: "barang 1",
                    kategori: "kategori 16",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "lokasi1",
                })
                .set('Authorization', token);
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Kategori tersebut tidak ada');
        });
        it('should return error if lokasi barang missing when data inserted', async () => {
            const kategori = await supertest(app)
                .post('/barang')
                .send({
                    namaBarang: "barang 1",
                    kategori: "kategori1",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "lokasi 12",
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
            expect(barang.body.data).toHaveProperty('namaBarang');
            expect(barang.body.data).toHaveProperty('kategori');
            expect(barang.body.data).toHaveProperty('tanggalPerolehan');
            expect(barang.body.data).toHaveProperty('hargaPerolehan');
            expect(barang.body.data).toHaveProperty('masaGuna');
            expect(barang.body.data).toHaveProperty('kondisi');
            expect(barang.body.data).toHaveProperty('lokasi');
            expect(barang.body.data).toHaveProperty('penggunaSaatIni');
            expect(barang.body.data).toHaveProperty('kodeBarang');
            expect(barang.body.data.namaBarang).toBe('TES');
            expect(barang.body.data.kategori).toBe('kategori1');
            expect(barang.body.data.tanggalPerolehan).toBe('2022-05-02T00:00:00.000Z');
            expect(barang.body.data.hargaPerolehan).toBe(100000);
            expect(barang.body.data.masaGuna).toBe('12 BULAN');
            expect(barang.body.data.kondisi).toBe('BAIK');
            expect(barang.body.data.lokasi).toBe('RAK ATAS');
            expect(barang.body.data.penggunaSaatIni).toBe('-');
            expect(barang.body.data.kodeBarang).toBe('544244');
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
                    kategori: "kategori1",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "lokasi1",
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
            expect(barang.body.data).toHaveProperty('penggunaSaatIni');
            expect(barang.body.data.namaBarang).toBe('BARANG 1 EDIT');
            expect(barang.body.data.kategori).toBe('KATEGORI1');
            expect(barang.body.data.tanggalPerolehan).toBe('2022-05-02');
            expect(barang.body.data.hargaPerolehan).toBe(100000);
            expect(barang.body.data.masaGuna).toBe('12 BULAN');
            expect(barang.body.data.kondisi).toBe('BAIK');
            expect(barang.body.data.lokasi).toBe('LOKASI1');
            expect(barang.body.data.penggunaSaatIni).toBe('-');
        });
        it('should return error if kategori missing when data inserted', async () => {
            const kategori = await supertest(app)
                .put('/barang/64871282407585f33503200c')
                .send({
                    namaBarang: "barang 1 edit",
                    kategori: "kategori 16",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "lokasi1",
                })
                .set('Authorization', token);
            expect(kategori.statusCode).toBe(500);
            expect(kategori.body.message).toBe('Kategori tersebut tidak ada');
        });
        it('should return error if lokasi barang missing when data inserted', async () => {
            const kategori = await supertest(app)
                .put('/barang/64871282407585f33503200c')
                .send({
                    namaBarang: "barang 1",
                    kategori: "kategori1",
                    tanggalPerolehan: "2022-05-02",
                    hargaPerolehan: 100000,
                    masaGuna: "12 bulan",
                    kondisi: "baik",
                    lokasi: "lokasi16",
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
        await disconnect();
    });
});