const Karyawan = require('../../src/model/karyawan');
const Barang = require('../../src/model/barang');
const {
  karyawans,
} = require('../fixtures/karyawan');
const {
  barangs,
} = require('../fixtures/barang');
const {
  fetchKaryawan,
  getKaryawan,
  createKaryawan,
  updateKaryawan,
  deleteKaryawan,
  searchKaryawan,
} = require('../../src/application/domain/karyawan.domain');

describe('src/application/domain/karyawan.domain.spec.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('fetchKaryawan()', () => {
    it('should return all karyawan', async () => {
      jest.spyOn(Karyawan, 'find').mockResolvedValue(karyawans);
      const response = await fetchKaryawan();
      expect(response.data).toBe(karyawans);
    });
  });
  describe('getKaryawan()', () => {
    it('should return one karyawan', async () => {
      jest.spyOn(Karyawan, 'findOne').mockResolvedValue(karyawans[0]);
      const response = await getKaryawan(karyawans[0]._id);
      expect(response).toHaveProperty('data');
      expect(response.data).toBe(karyawans[0]);
    });
    it('should throw error', async () => {
      jest.spyOn(Karyawan, 'findOne').mockRejectedValue();
      const response = await getKaryawan('gdgdfdgf');
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Karyawan tidak ditemukan');
    });
  });
  describe('createKaryawan()', () => {
    const karyawan = {
      namaKaryawan: 'karyawan18',
    };
    it('should return inserted karyawan', async () => {
      jest.spyOn(Karyawan, 'create').mockResolvedValue(karyawan);
      jest.spyOn(Karyawan, 'find').mockReturnValue([]);
      const response = await createKaryawan(karyawan);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(karyawan);
    });
    it('should throw error karyawan has created', async () => {
      jest.spyOn(Karyawan, 'find').mockReturnValue(karyawan);
      const response = await createKaryawan(karyawan);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Karyawan sudah ada');
    });
    it('should throw error failed to create karyawan', async () => {
      jest.spyOn(Karyawan, 'create').mockRejectedValue();
      jest.spyOn(Karyawan, 'find').mockReturnValue([]);
      const response = await createKaryawan(karyawan);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal menambahkan karyawan");
    });
  });
  describe('updateKaryawan()', () => {
    const karyawan = {
      namaKaryawan: 'karyawan-1',
    };
    it('should return updated karyawan', async () => {
      jest.spyOn(Karyawan, 'updateOne').mockResolvedValue({ modifiedCount: 1 });
      jest.spyOn(Karyawan, 'find').mockReturnValue([]);
      const response = await updateKaryawan(karyawans[0]._id, karyawan);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(karyawan);
    });
    it('should throw error karyawan already available', async () => {
      jest.spyOn(Karyawan, 'find').mockReturnValue(karyawan);
      const response = await updateKaryawan(karyawans[0]._id,karyawan);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Karyawan sudah ada');
    });
    it('should throw error karyawan failed to update', async () => {
      jest.spyOn(Karyawan, 'updateOne').mockRejectedValue();
      jest.spyOn(Karyawan, 'find').mockReturnValue([]);
      const response = await updateKaryawan(karyawan);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Gagal memperbarui karyawan');
    });
  });
  describe('deleteKaryawan()', () => {
    it('should return deleted message karyawan', async () => {
      jest.spyOn(Karyawan, 'deleteOne').mockResolvedValue({deletedCount: 1});
      jest.spyOn(Barang, 'find').mockReturnValue([]);
      const response = await deleteKaryawan(karyawans[3]._id);
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(200);
      expect(response.message).toBe('Berhasil menghapus karyawan');
    });
    it('should throw error karyawan cannot be deleted because there are linked items', async () => {
      jest.spyOn(Barang, 'find').mockResolvedValue(barangs[0]);
      const response = await deleteKaryawan(karyawans[1]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(400);
    });
    it('should throw error karyawan failed to be deleted', async () => {
      jest.spyOn(Barang, 'find').mockReturnValue([]);
      jest.spyOn(Karyawan, 'deleteOne').mockRejectedValue();
      const response = await deleteKaryawan(karyawans[2]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal menghapus karyawan");
    });
  });
  describe('searchKaryawan()', () => {
    it('should return searching karyawan', async () => {
      jest.spyOn(Karyawan, 'find').mockResolvedValue(karyawans[0]);
      const response = await searchKaryawan({namaKaryawan: karyawans[0].namaKaryawan});
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(karyawans[0]);
    });
  });
  describe('searchKaryawan()', () => {
    it('should return not found message', async () => {
      jest.spyOn(Karyawan, 'find').mockResolvedValue([]);
      const response = await searchKaryawan({namaKaryawan: "karyawan376"});
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(404);
      expect(response.message).toBe("Data karyawan tidak ada!");
    });
  });
});