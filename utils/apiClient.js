/**
 * @fileoverview Universal API client wrapping Playwright APIRequestContext.
 * Supports dynamic configuration (baseURL, endpoint, headers, params, body, auth token)
 * and detailed logging/timing.
 */

const { request } = require('@playwright/test');
const { logInfo, logError } = require('./logUtils');

class ApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} [apiContext] - Optional Playwright request context
   */
  constructor(apiContext = null) {
    this.apiContext = apiContext;
  }

  /**
   * Send an HTTP request.
   * @param {object} options
   * @param {string} options.method - HTTP method (GET, POST, PUT, PATCH, DELETE)
   * @param {string} [options.baseURL] - Dynamic base URL
   * @param {string} options.endpoint - Endpoint or full URL
   * @param {object} [options.headers] - Request headers
   * @param {object} [options.params] - Query parameters
   * @param {object} [options.data] - Request payload
   * @param {string} [options.token] - Authentication token (Cookie or Bearer)
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async sendRequest(options) {
    const {
      method,
      baseURL,
      endpoint,
      headers = {},
      params,
      data,
      token,
    } = options;

    let targetUrl = endpoint;
    let context = this.apiContext;

    // Resolve URL if baseURL is dynamically provided
    if (baseURL) {
      const cleanBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      targetUrl = `${cleanBase}${cleanEndpoint}`;
    }

    // Fallback context if none provided (e.g. standalone test calls)
    if (!context) {
      context = await request.newContext({
        ignoreHTTPSErrors: true,
      });
    }

    // Set headers and auth dynamically
    const finalHeaders = { ...headers };
    if (token) {
      if (token.startsWith('token=')) {
        finalHeaders['Cookie'] = token;
      } else if (token.includes('=')) {
        finalHeaders['Cookie'] = token;
      } else {
        finalHeaders['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }
    }

    const requestOptions = {
      headers: finalHeaders,
    };

    if (params) {
      requestOptions.params = params;
    }

    if (data) {
      requestOptions.data = data;
    }

    logInfo(`[API Request] Method: ${method.toUpperCase()} | URL: ${targetUrl} | Params: ${JSON.stringify(params || {})} | Body: ${JSON.stringify(data || {})}`);

    const startTime = Date.now();
    try {
      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await context.get(targetUrl, requestOptions);
          break;
        case 'POST':
          response = await context.post(targetUrl, requestOptions);
          break;
        case 'PUT':
          response = await context.put(targetUrl, requestOptions);
          break;
        case 'PATCH':
          response = await context.patch(targetUrl, requestOptions);
          break;
        case 'DELETE':
          response = await context.delete(targetUrl, requestOptions);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      const duration = Date.now() - startTime;
      response.durationMs = duration;

      logInfo(`[API Response] Status: ${response.status()} ${response.statusText()} | Duration: ${duration}ms`);

      // Clean up temporary contexts to avoid leaks
      if (!this.apiContext) {
        await context.dispose();
      }

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;
      logError(`[API Error] Request failed: ${method.toUpperCase()} ${targetUrl} | Duration: ${duration}ms | Error: ${error.message}`);
      
      if (!this.apiContext && context) {
        await context.dispose();
      }
      throw error;
    }
  }

  // HTTP method helper mappings
  async get(options) { return this.sendRequest({ ...options, method: 'GET' }); }
  async post(options) { return this.sendRequest({ ...options, method: 'POST' }); }
  async put(options) { return this.sendRequest({ ...options, method: 'PUT' }); }
  async patch(options) { return this.sendRequest({ ...options, method: 'PATCH' }); }
  async delete(options) { return this.sendRequest({ ...options, method: 'DELETE' }); }
}

module.exports = { ApiClient };
