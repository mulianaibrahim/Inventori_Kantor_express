const Barang = require('../../src/model/barang');
const Kategori = require('../../src/model/kategori');
const Lokasi = require('../../src/model/lokasi');
const {
  barangs,
} = require('../fixtures/barang');
const {
  fetchBarang,
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
  searchBarang,
  generateRandomString
} = require('../../src/application/domain/barang.domain');
describe('src/application/domain/barang.domain.spec.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('fetchBarang()', () => {
    it('should return all barang', async () => {
      jest.spyOn(Barang, 'find').mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(barangs),
      });
      const response = await fetchBarang();
      expect(response.status).toBe(200);
    });
  });
  describe('getBarang()', () => {
    it('should return one barang', async () => {
      jest.spyOn(Barang, 'find').mockReturnValue({
        populate: jest.fn().mockResolvedValue([barangs[0]]),
      });
      const response = await getBarang(barangs[0]._id);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
    });
    it('should throw error', async () => {
      jest.spyOn(Barang, 'find').mockImplementation(() => ({
        populate: jest.fn().mockResolvedValue([])
    }));
      const response = await getBarang('gdgdfdgf');
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Barang tidak ditemukan');
    });
  });
  describe('createBarang()', () => {
    it('should return inserted barang', async () => {
      jest.spyOn(Barang, 'create').mockResolvedValue(barangs[0]);
      jest.spyOn(Kategori, 'find').mockResolvedValue([{}]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([{}]);
      const response = await createBarang(barangs[0]);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(barangs[0]);
    });
    it('should throw error kategori not found', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([{}]);
      jest.spyOn(Barang, 'create').mockResolvedValue(barangs[0]);
      const response = await createBarang(barangs[0]);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Kategori tersebut tidak ada');
    });
    it('should throw error lokasi penyimpanan not found', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([{}]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([]);
      jest.spyOn(Barang, 'create').mockResolvedValue(barangs[0]);
      const response = await createBarang(barangs[0]);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Lokasi penyimpanan tersebut tidak ada');
    });
    it('should throw error failed to create barang', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([{}]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([{}]);
      jest.spyOn(Barang, 'create').mockRejectedValue();
      const response = await createBarang(barangs[0]);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal menambahkan Barang");
    });
  });
  describe('updateBarang()', () => {
    it('should return inserted barang', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([{}]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([{}]);
      jest.spyOn(Barang, 'findByIdAndUpdate').mockResolvedValue({ modifiedCount: 1 });
      const response = await updateBarang(barangs[1]._id, barangs[1]);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(barangs[1]);
    });
    it('should throw error kategori not found', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([{}]);
      jest.spyOn(Barang, 'findByIdAndUpdate').mockResolvedValue({ modifiedCount: 1 });
      const response = await updateBarang(barangs[1]._id, barangs[1]);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Kategori tersebut tidak ada');
    });
    it('should throw error lokasi penyimpanan not found', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([{}]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([]);
      jest.spyOn(Barang, 'findByIdAndUpdate').mockResolvedValue({ modifiedCount: 1 });
      const response = await updateBarang(barangs[1]._id, barangs[1]);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Lokasi penyimpanan tersebut tidak ada');
    });
    it('should throw error failed to update barang', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([{}]);
      jest.spyOn(Lokasi, 'find').mockResolvedValue([{}]);
      jest.spyOn(Barang, 'findByIdAndUpdate').mockRejectedValue();
      const response = await updateBarang(barangs[1]._id, barangs[1]);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal memperbarui data barang!");
    });
  });
  describe('deleteBarang()', () => {
    it('should return deleted message', async () => {
      jest.spyOn(Barang, 'deleteOne').mockResolvedValue({deletedCount: 1});
      jest.spyOn(Barang, 'find').mockReturnValue({
        populate: jest.fn().mockResolvedValue([barangs[1]]),
      });
      const response = await deleteBarang(barangs[1]._id);
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(200);
      expect(response.message).toBe('Berhasil menghapus Barang');
    });
    it('should throw error barang cannot be deleted because currently using', async () => {
      jest.spyOn(Barang, 'deleteOne').mockResolvedValue({deletedCount: 0});
      jest.spyOn(Barang, 'find').mockReturnValue({
        populate: jest.fn().mockResolvedValue([barangs[4]]),
      });
      const response = await deleteBarang(barangs[4]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(400);
    });
    it('should throw error barang failed to be deleted', async () => {
      jest.spyOn(Barang, 'deleteOne').mockRejectedValue();
      jest.spyOn(Barang, 'find').mockResolvedValue({penggunaSaatIni: null});
      const response = await deleteBarang(barangs[2]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal menghapus data barang");
    });
  });
  // describe('searchBarang()', () => {
  //   it('should return searching karyawan', async () => {
  //     jest.spyOn(Karyawan, 'find').mockResolvedValue(barangs[0]);
  //     const response = await searchBarang({namaKaryawan: barangs[0].namaKaryawan});
  //     expect(response).toHaveProperty('data');
  //     expect(response.status).toBe(200);
  //     expect(response.data).toBe(barangs[0]);
  //   });
  // });
  // describe('searchBarang()', () => {
  //   it('should return not found message', async () => {
  //     jest.spyOn(Karyawan, 'find').mockResolvedValue([]);
  //     const response = await searchBarang({namaKaryawan: "karyawan376"});
  //     expect(response).toHaveProperty('message');
  //     expect(response.status).toBe(404);
  //     expect(response.message).toBe("Data karyawan tidak ada!");
  //   });
  // });
});