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
const {
    insertLokasi,
    deleteLokasi
} = require('../fixtures/lokasi');
const {
    insertKaryawan,
    deleteKaryawan
} = require('../fixtures/karyawan');
const {
    insertBarang,
    deleteBarang
} = require('../fixtures/barang');
const {
    insertPenggunaan,
    deletePenggunaan
} = require('../fixtures/penggunaan');
const {
    deleteUser
} = require('../fixtures/user');

describe('tests/e2e/penggunaan.spec.js', () => {
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
        await insertKaryawan();
        await insertKategori();
        await insertLokasi();
        await insertBarang();
        await insertPenggunaan();
    });
    afterEach(async () => {
        await deletePenggunaan();
        await deleteBarang();
        await deleteKaryawan();
        await deleteKategori();
        await deleteLokasi();
    });

    describe('GET /penggunaan', () => {
        it('should return statusCode 200 when request success', async () => {
            const karyawan = await supertest(app)
                .get('/penggunaan')
                .set('Authorization', token);
            expect(karyawan.statusCode).toBe(200);
        });
    });
    describe('POST /penggunaan', () => {
        it('should return inserted penggunaan on uppercase when data inserted', async () => {
            const penggunaan = await supertest(app)
                .post('/penggunaan')
                .send({
                    namaBarang: "6486ef78dc1c04f730a2c1d2",
                    pengguna: "64871289c0c87723dd4a18f0",
                    tanggalMulaiPenggunaan: "2022-09-22",
                })
                .set('Authorization', token);
            expect(penggunaan.statusCode).toBe(200);
            expect(penggunaan.body.data.namaBarang).toBe('6486ef78dc1c04f730a2c1d2');
            expect(penggunaan.body.data.pengguna).toBe('64871289c0c87723dd4a18f0');
            expect(penggunaan.body.data.tanggalMulaiPenggunaan).toBe('2022-09-22');
        });
        it('should return error barang at the moment is using when data inserted', async () => {
            const penggunaan = await supertest(app)
                .post('/penggunaan')
                .send({
                    namaBarang: "64871289c0c87723dd4a18f1",
                    pengguna: "64871289c0c87723dd4a18f0",
                    tanggalMulaiPenggunaan: "2022-09-22",
                })
                .set('Authorization', token);
            expect(penggunaan.statusCode).toBe(500);
            expect(penggunaan.body.message).toBe('Barang tersebut sedang digunakan');
        });
    });
    describe('PATCH /penggunaan/:id', () => {
        it('should return kondisiPengembalian on uppercase when action is performed', async () => {
            const penggunaan = await supertest(app)
                .patch('/penggunaan/6486ef6fdc1c04f730a2c1d0')
                .send({
                    kondisiPengembalian: "keyboard rusak"
                })
                .set('Authorization', token);
            expect(penggunaan.status).toBe(200);
            expect(penggunaan.body.data.kondisiPengembalian).toBe('keyboard rusak');
        });
        it('should return error kondisiPengembalian must be filled', async () => {
            const penggunaan = await supertest(app)
                .patch('/penggunaan/6486ef6fdc1c04f730a2c1d0')
                .send({
                    kondisiPengembalian: null,
                }).set('Authorization', token);
            expect(penggunaan.statusCode).toBe(500);
            expect(penggunaan.body.message).toBe('Kondisi pengembalian harus diisi!');
        });
    });
    afterAll(async () => {
        await deleteUser();
        await disconnect();
    });
});