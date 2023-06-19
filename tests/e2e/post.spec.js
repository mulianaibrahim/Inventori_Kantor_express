const supertest = require('supertest');
const { app } = require('../app');
const { disconnect } = require('../../src/database');
const { insertManyPosts, deleteManyPosts } = require('../fixtures/posts');
describe('tests/e2e/post.spec.js', () => {
  beforeEach(async () => {
    await deleteManyPosts();
    await insertManyPosts();
  });

  afterEach(async () => {
    await deleteManyPosts();
  });

  describe('GET /posts', () => {
    it('should return all posts when data exists', async () => {
      const posts = await supertest(app).get('/posts');
      expect(posts.body).toHaveLength(4);
      expect(posts.status).toBe(200);
    });
  });
  describe('POST /posts', () => {
    it('should return inserted post when data inserted', async () => {
      const posts = await supertest(app).post('/posts').send({
        title: 'test5',
        body: 'test5',
      });
      expect(posts.status).toBe(200);
      expect(posts.body.title).toBe('test5');
      expect(posts.body.body).toBe('test5');
    });
    it('should return error title validation when title not filled', async () => {
      const posts = await supertest(app).post('/posts').send({
        body: 'test5',
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe('title harus diisi');
    });
    it('should return error body validation when body not filled', async () => {
      const posts = await supertest(app).post('/posts').send({
        title: 'test5',
      });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe('body harus diisi');
    });
    it('should return error validation when all field are not filled', async () => {
      const posts = await supertest(app).post('/posts').send({});
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe('title harus diisi');
    });
  });
  describe('GET /posts/:id', () => {
    it('should return one posts when data exists', async () => {
      const posts = await supertest(app).get('/posts/64871282407585f33503200c');
      expect(posts.status).toBe(200);
      expect(posts.body).toHaveProperty('title');
      expect(posts.body).toHaveProperty('body');
      expect(posts.body.title).toBe('test3');
      expect(posts.body.body).toBe('test3');
    });
    it('should return not found error when data is not exists', async () => {
      const posts = await supertest(app).get(
        '/posts/64871282407585f33503200cnotfound'
      );
      expect(posts.status).toBe(404);
      expect(posts.body.message).toBe('not found');
    });
  });
  describe('PUT /posts/:id', () => {
    it('should return inserted post when data inserted', async () => {
      const posts = await supertest(app)
        .put('/posts/64871282407585f33503200c')
        .send({
          title: 'test5',
          body: 'test5',
        });
      expect(posts.status).toBe(200);
      expect(posts.body.title).toBe('test5');
      expect(posts.body.body).toBe('test5');
    });
    it('should return error title validation when title not filled', async () => {
      const posts = await supertest(app)
        .put('/posts/64871282407585f33503200c')
        .send({
          body: 'test5',
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe('title harus diisi');
    });
    it('should return error body validation when body not filled', async () => {
      const posts = await supertest(app)
        .put('/posts/64871282407585f33503200c')
        .send({
          title: 'test5',
        });
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe('body harus diisi');
    });
    it('should return error validation when all field are not filled', async () => {
      const posts = await supertest(app)
        .put('/posts/64871282407585f33503200c')
        .send({});
      expect(posts.status).toBe(400);
      expect(posts.body.message).toBe('title harus diisi');
    });
  });
  describe('DELETE /posts/:id', () => {
    it('should delete one data', async () => {
      const deletePost = await supertest(app).delete(
        '/posts/64871282407585f33503200c'
      );
      const posts = await supertest(app).get('/posts');
      expect(deletePost.status).toBe(204);
      expect(posts.body).toHaveLength(3);
    });
  });

  afterAll(async () => {
    await disconnect();
  });
});
