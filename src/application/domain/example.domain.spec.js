const Post = require('../../model/posts');
const {posts} = require('../../../tests/fixtures/posts');
const {
    fetchPosts, getPost
} = require('./post.domain');

describe('src/application/domain/post.domain.spec.js', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    describe('fetchPosts()', () => {
        it('should return all posts', async() => {
            jest.spyOn(Post, 'find').mockResolvedValue(posts);
            const response = await fetchPosts();
            expect(response.data).toBe(posts);
        });
    });
    describe('getPost()', () => {
        it('should return one posts', async() => {
            jest.spyOn(Post, 'findOne').mockResolvedValue(posts[0]);
            const response = await getPost();
            expect(response).toHaveProperty('data');
            expect(response.data).toBe(posts[0]);
        });
        it('should throw error', async() => {
            jest.spyOn(Post, 'findOne').mockRejectedValue(posts[0]);
            const response = await getPost();
            expect(response).not.toHaveProperty('data');
            expect(response).toHaveProperty('message');
            expect(response.message).toBe('not found');
        });
    });
});