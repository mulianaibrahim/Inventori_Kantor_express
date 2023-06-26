const Lokasi = require('../../src/model/lokasi');
const Barang = require('../../src/model/barang');
const {
  lokasis,
} = require('../fixtures/lokasi');
const {
  barangs,
} = require('../fixtures/barang');
const {
  fetchLokasi,
  getLokasi,
  createLokasi,
  updateLokasi,
  deleteLokasi,
  searchLokasi,
} = require('../../src/application/domain/lokasi.domain');

describe('src/application/domain/lokasi.domain.spec.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('fetchLokasi', () => {
    it('should return all lokasi', async () => {
      jest.spyOn(Lokasi, 'find').mockResolvedValue(lokasis);
      const response = await fetchLokasi();
      expect(response.data).toBe(lokasis);
    });
  });
  describe('getLokasi', () => {
    it('should return one lokasi', async () => {
      jest.spyOn(Lokasi, 'findOne').mockResolvedValue(lokasis[0]);
      const response = await getLokasi(lokasis[0]._id);
      expect(response).toHaveProperty('data');
      expect(response.data).toBe(lokasis[0]);
    });
    it('should throw error', async () => {
      jest.spyOn(Lokasi, 'findOne').mockRejectedValue();
      const response = await getLokasi(lokasis[0]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Lokasi penyimpanan tidak ditemukan');
    });
  });
  describe('createLokasi', () => {
    const lokasi = {
      namaLokasi: 'lokasi17',
    };
    it('should return inserted lokasi', async () => {
      jest.spyOn(Lokasi, 'create').mockResolvedValue(lokasi);
      jest.spyOn(Lokasi, 'find').mockReturnValue([]);
      const response = await createLokasi(lokasi);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(lokasi);
    });
    it('should throw error lokasi has created', async () => {
      jest.spyOn(Lokasi, 'find').mockReturnValue(lokasi);
      const response = await createLokasi(lokasi);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Nama lokasi penyimpanan sudah ada');
    });
    it('should throw error failed to create lokasi', async () => {
      jest.spyOn(Lokasi, 'create').mockRejectedValue();
      jest.spyOn(Lokasi, 'find').mockReturnValue([]);
      const response = await createLokasi(lokasi);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal menambahkan lokasi penyimpanan");
    });
  });
  describe('updateLokasi', () => {
    const lokasi = {
      namaLokasi: 'lokasi18',
    };
    it('should return updated lokasi', async () => {
      jest.spyOn(Lokasi, 'updateOne').mockResolvedValue({ modifiedCount: 1 });
      jest.spyOn(Lokasi, 'find').mockReturnValue([]);
      const response = await updateLokasi(lokasis[0]._id, lokasi);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(lokasi);
    });
    it('should throw error lokasi already available', async () => {
      jest.spyOn(Lokasi, 'find').mockReturnValue(lokasi);
      const response = await updateLokasi(lokasis[0]._id,lokasi);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Nama lokasi penyimpanan sudah ada');
    });
    it('should throw error lokasi failed to update', async () => {
      jest.spyOn(Lokasi, 'updateOne').mockRejectedValue();
      jest.spyOn(Lokasi, 'find').mockReturnValue([]);
      const response = await updateLokasi(lokasi);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Gagal memperbarui lokasi penyimpanan');
    });
  });
  describe('deleteLokasi', () => {
    it('should return deleted message lokasi', async () => {
      jest.spyOn(Lokasi, 'deleteOne').mockResolvedValue({deletedCount: 1});
      jest.spyOn(Barang, 'find').mockReturnValue([]);
      const response = await deleteLokasi(lokasis[3]._id);
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(200);
      expect(response.message).toBe('Berhasil menghapus lokasi penyimpanan');
    });
    it('should throw error lokasi cannot be deleted because there are linked items', async () => {
      jest.spyOn(Barang, 'find').mockResolvedValue(barangs[0]);
      const response = await deleteLokasi(lokasis[1]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(400);
    });
    it('should throw error lokasi failed to be deleted', async () => {
      jest.spyOn(Barang, 'find').mockReturnValue([]);
      jest.spyOn(Lokasi, 'deleteOne').mockRejectedValue();
      const response = await deleteLokasi(lokasis[2]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal menghapus lokasi penyimpanan!");
    });
  });
  describe('searchLokasi', () => {
    it('should return searching lokasi', async () => {
      jest.spyOn(Lokasi, 'find').mockResolvedValue(lokasis[0]);
      const response = await searchLokasi({namaLokasi: lokasis[0].namaLokasi});
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(lokasis[0]);
    });
  });
  describe('searchLokasi', () => {
    it('should return not found message', async () => {
      jest.spyOn(Lokasi, 'find').mockResolvedValue([]);
      const response = await searchLokasi({namaLokasi: "lokasidkdkf"});
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(404);
      expect(response.message).toBe("Data lokasi penyimpanan tidak ada!");
    });
  });
});