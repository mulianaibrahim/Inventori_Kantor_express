const Kategori = require('../../src/model/kategori');
const Barang = require('../../src/model/barang');
const {
  kategoris,
} = require('../fixtures/kategori');
const {
  barangs,
} = require('../fixtures/barang');
const {
  fetchKategori,
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
  searchKategori,
} = require('../../src/application/domain/kategori.domain');

describe('src/application/domain/kategori.domain.spec.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('fetchKategori()', () => {
    it('should return all kategori', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue(kategoris);
      const response = await fetchKategori();
      expect(response.data).toBe(kategoris);
    });
  });
  describe('getKategori()', () => {
    it('should return one kategori', async () => {
      jest.spyOn(Kategori, 'findOne').mockResolvedValue(kategoris[0]);
      const response = await getKategori(kategoris[0]._id);
      expect(response).toHaveProperty('data');
      expect(response.data).toBe(kategoris[0]);
    });
    it('should throw error', async () => {
      jest.spyOn(Kategori, 'findOne').mockRejectedValue();
      const response = await getKategori('gdgdfdgf');
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Kategori tidak ditemukan');
    });
  });
  describe('createKategori()', () => {
    const kategori = {
      namaKategori: 'kategori17',
    };
    it('should return inserted kategori', async () => {
      jest.spyOn(Kategori, 'create').mockResolvedValue(kategori);
      jest.spyOn(Kategori, 'find').mockReturnValue([]);
      const response = await createKategori(kategori);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(kategori);
    });
    it('should throw error kategori has created', async () => {
      jest.spyOn(Kategori, 'find').mockReturnValue(kategori);
      const response = await createKategori(kategori);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Kategori sudah ada');
    });
    it('should throw error failed to create kategori', async () => {
      jest.spyOn(Kategori, 'create').mockRejectedValue();
      jest.spyOn(Kategori, 'find').mockReturnValue([]);
      const response = await createKategori(kategori);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal membuat kategori");
    });
  });
  describe('updateKategori()', () => {
    const kategori = {
      namaKategori: 'kategori17',
    };
    it('should return updated kategori', async () => {
      jest.spyOn(Kategori, 'updateOne').mockResolvedValue({ modifiedCount: 1 });
      jest.spyOn(Kategori, 'find').mockReturnValue([]);
      const response = await updateKategori(kategoris[0]._id, kategori);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(kategori);
    });
    it('should throw error kategori already available', async () => {
      jest.spyOn(Kategori, 'find').mockReturnValue(kategori);
      const response = await updateKategori(kategoris[0]._id,kategori);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Kategori sudah ada');
    });
    it('should throw error kategori failed to update', async () => {
      jest.spyOn(Kategori, 'updateOne').mockRejectedValue();
      jest.spyOn(Kategori, 'find').mockReturnValue([]);
      const response = await updateKategori(kategori);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Gagal memperbarui kategori');
    });
  });
  describe('deleteKategori()', () => {
    it('should return deleted message kategori', async () => {
      jest.spyOn(Kategori, 'deleteOne').mockResolvedValue({deletedCount: 1});
      jest.spyOn(Barang, 'find').mockReturnValue([]);
      const response = await deleteKategori(kategoris[3]._id);
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(200);
      expect(response.message).toBe('Berhasil menghapus kategori');
    });
    it('should throw error kategori cannot be deleted because there are linked items', async () => {
      jest.spyOn(Barang, 'find').mockResolvedValue(barangs[0]);
      const response = await deleteKategori(kategoris[1]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(400);
    });
    it('should throw error kategori failed to be deleted', async () => {
      jest.spyOn(Barang, 'find').mockReturnValue([]);
      jest.spyOn(Kategori, 'deleteOne').mockRejectedValue();
      const response = await deleteKategori(kategoris[2]._id);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Gagal menghapus kategori");
    });
  });
  describe('searchKategori()', () => {
    it('should return searching kategori', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue(kategoris[0]);
      const response = await searchKategori({namaKategori: kategoris[0].namaKategori});
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(kategoris[0]);
    });
  });
  describe('searchKategori()', () => {
    it('should return not found message', async () => {
      jest.spyOn(Kategori, 'find').mockResolvedValue([]);
      const response = await searchKategori({namaKategori: "kategori9083"});
      expect(response).toHaveProperty('message');
      expect(response.status).toBe(404);
      expect(response.message).toBe("Kategori tidak ditemukan");
    });
  });
});