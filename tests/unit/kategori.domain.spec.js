const Kategori = require('../../src/model/kategori');
const {
  kategoris,
} = require('../fixtures/kategori');
const {fetchKategori,
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
  searchKategori} = require('../../src/application/domain/kategori.domain');

describe('src/application/domain/kategori/kategori.domain.spec.js', () => {
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
    });
    it('should throw error kategori has created', async () => {
      jest.spyOn(Kategori, 'create').mockResolvedValue(kategori);
      jest.spyOn(Kategori, 'find').mockReturnValue(kategori);
      const response = await createKategori(kategori);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Kategori sudah ada');
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
    });
    it('should throw error kategori has created', async () => {
      jest.spyOn(Kategori, 'create').mockResolvedValue(kategori);
      jest.spyOn(Kategori, 'find').mockReturnValue(kategori);
      const response = await createKategori(kategori);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe('Kategori sudah ada');
    });
  });
});