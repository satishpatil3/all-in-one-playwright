/**
 * @fileoverview Post API service mapping all operations for JSONPlaceholder.
 */

const { URLS } = require('../constants/urls');

class PostService {
  /**
   * @param {ApiClient} apiClient
   */
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Create a new post.
   * @param {object} payload
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  createPost(payload) {
    return this.apiClient.post({
      baseURL: URLS.JSONPLACEHOLDER_API,
      endpoint: '/posts',
      data: payload,
    });
  }

  /**
   * Get a post by ID.
   * @param {number|string} id
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  getPostById(id) {
    return this.apiClient.get({
      baseURL: URLS.JSONPLACEHOLDER_API,
      endpoint: `/posts/${id}`,
    });
  }

  /**
   * Update a post.
   * @param {number|string} id
   * @param {object} payload
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  updatePost(id, payload) {
    return this.apiClient.put({
      baseURL: URLS.JSONPLACEHOLDER_API,
      endpoint: `/posts/${id}`,
      data: payload,
    });
  }

  /**
   * Delete a post.
   * @param {number|string} id
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  deletePost(id) {
    return this.apiClient.delete({
      baseURL: URLS.JSONPLACEHOLDER_API,
      endpoint: `/posts/${id}`,
    });
  }
}

module.exports = { PostService };
