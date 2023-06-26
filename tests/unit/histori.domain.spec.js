const historiPenggunaan = require('../../src/model/historiPenggunaan');
const {
  historis,
} = require('../fixtures/histori');
const {
    fetchHistoriPenggunaan,
    createHistoriPenggunaan,
} = require('../../src/application/domain/historiPenggunaan.domain');

describe('src/application/domain/historiPenggunaan.domain.spec.js', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  describe('fetchHistoriPenggunaan()', () => {
    it('should return all histori penggunaan', async () => {
      jest.spyOn(historiPenggunaan, 'find').mockResolvedValue(historis);
      const response = await fetchHistoriPenggunaan();
      expect(response.data).toBe(historis);
    });
  });
  describe('createHistoriPenggunaan()', () => {
    it('should return created histori penggunaan', async () => {
      jest.spyOn(historiPenggunaan, 'create').mockResolvedValue(historis[0]);
      const response = await createHistoriPenggunaan(historis[0]);
      expect(response).toHaveProperty('data');
      expect(response.status).toBe(200);
      expect(response.data).toBe(historis[0]);
    });
    it('should throw error failed to create histori penggunaan', async () => {
      jest.spyOn(historiPenggunaan, 'create').mockRejectedValue();
      const response = await createHistoriPenggunaan(historis[0]);
      expect(response).not.toHaveProperty('data');
      expect(response).toHaveProperty('message');
      expect(response.message).toBe("Aksi gagal!");
    });
  });
});