const Barang = require('../../src/model/barang');
const Penggunaan = require('../../src/model/penggunaan');
const HistoriPenggunaan = require('../../src/model/historiPenggunaan');
const {
  penggunaans,
} = require('../fixtures/penggunaan');
const {
  barangs,
} = require('../fixtures/barang');
const {
  historis,
} = require('../fixtures/histori');
const {
  fetchPenggunaan,
  createPenggunaan,
  selesaikanPenggunaan,
} = require('../../src/application/domain/penggunaan.domain');
describe('src/application/domain/penggunaan.domain.spec.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('fetchPenggunaan()', () => {
    it('should return all barang yang sedang digunakan', async () => {
      jest.spyOn(Penggunaan, 'find').mockReturnValue({
        populate: jest.fn().mockResolvedValue(penggunaans),
      });
      const response = await fetchPenggunaan();
      expect(response.status).toBe(200);
    });
  });
  describe('createPenggunaan()', () => {
    it('should return inserted data penggunaan', async () => {
      jest.spyOn(Penggunaan, 'create').mockResolvedValue(penggunaans[0]);
      jest.spyOn(Barang, 'findOne').mockReturnValue(barangs[0]);
      jest.spyOn(Barang, 'updateOne').mockResolvedValue({
        modifiedCount: 1
      });
      const response = await createPenggunaan(penggunaans[0]);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(penggunaans[0]);
    });
    it('should throw error gagal memperbarui key penggunaSaatIni pada collection barang', async () => {
      jest.spyOn(Penggunaan, 'create').mockResolvedValue(penggunaans[0]);
      jest.spyOn(Barang, 'findOne').mockResolvedValue(barangs[0])
      jest.spyOn(Barang, 'updateOne').mockResolvedValue({
        modifiedCount: 0
      });
      const response = await createPenggunaan(penggunaans[0]);
      expect(response).not.toHaveProperty('data');
      expect(response.status).toBe(400);
      expect(response.message).toBe("Gagal memperbarui data penggunaSaatIni pada collection barang");
    });
    it('should throw error barang sedang digunakan', async () => {
      jest.spyOn(Penggunaan, 'create').mockResolvedValue(penggunaans[0]);
      jest.spyOn(Barang, 'findOne').mockReturnValue({
        populate: jest.fn().mockResolvedValue(barangs[4]),
      });
      jest.spyOn(Barang, 'updateOne').mockResolvedValue({
        modifiedCount: 1
      });
      const response = await createPenggunaan(penggunaans[0]);
      expect(response).not.toHaveProperty('data');
      expect(response.status).toBe(400);
      expect(response.message).toBe("Barang tersebut sedang digunakan");
    });
    it('should throw error data penggunaan gagal dibuat', async () => {
      jest.spyOn(Penggunaan, 'create').mockRejectedValue();
      jest.spyOn(Barang, 'findOne').mockResolvedValue(barangs[0])
      jest.spyOn(Barang, 'updateOne').mockRejectedValue();
      const response = await createPenggunaan(penggunaans[0]);
      expect(response).not.toHaveProperty('data');
      expect(response.status).toBe(500);
      expect(response.message).toBe("Aksi gagal dilakukan");
    });
  });
  describe('selesaikanPenggunaan()', () => {
    it('should return status 200', async () => {
      jest.spyOn(Barang, 'findOne').mockResolvedValue(barangs[0]);
      jest.spyOn(Barang, 'updateOne').mockResolvedValue({
        modifiedCount: 1
      });
      jest.spyOn(HistoriPenggunaan, 'create').mockResolvedValue(historis[0]);
      jest.spyOn(Penggunaan, 'deleteOne').mockResolvedValue({
        deletedCount: 1
      });
      jest.spyOn(Penggunaan, 'findById').mockResolvedValue(penggunaans[0]);
      const response = await selesaikanPenggunaan(penggunaans[0]._id, historis[0]);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
    });
    it('should return error message kondisi pengembalian harus diisi', async () => {
      jest.spyOn(Barang, 'findOne').mockResolvedValue(barangs[0]);
      jest.spyOn(Barang, 'updateOne').mockResolvedValue({
        modifiedCount: 1
      });
      jest.spyOn(HistoriPenggunaan, 'create').mockResolvedValue(historis[0]);
      jest.spyOn(Penggunaan, 'deleteOne').mockResolvedValue({
        deletedCount: 1
      });
      jest.spyOn(Penggunaan, 'findById').mockResolvedValue(penggunaans[0]);
      const response = await selesaikanPenggunaan(penggunaans[0]._id, {kondisiPengembalian: null});
      expect(response).not.toHaveProperty('data');
      expect(response.status).toBe(400);
      expect(response.message).toBe('Kondisi pengembalian harus diisi!');
    });
    it('should return error message kondisi pengembalian harus diisi', async () => {
      jest.spyOn(Barang, 'findOne').mockResolvedValue(barangs[0]);
      jest.spyOn(Barang, 'updateOne').mockRejectedValue();
      jest.spyOn(HistoriPenggunaan, 'create').mockRejectedValue();
      jest.spyOn(Penggunaan, 'deleteOne').mockRejectedValue();
      jest.spyOn(Penggunaan, 'findById').mockResolvedValue(penggunaans[0]);
      const response = await selesaikanPenggunaan(penggunaans[0]._id, historis[0]);
      expect(response).not.toHaveProperty('data');
      expect(response.status).toBe(500);
      expect(response.message).toBe("Aksi gagal dilakukan!");
    });
  });
});