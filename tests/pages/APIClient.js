export class APIClient {
  constructor(baseURL, headers) {
    this.baseURL = baseURL;
    this.headers = headers;
  }

  async get(request, endpoint, params = null) {
    const url = params ? `${this.baseURL}${endpoint}?${new URLSearchParams(params)}` : `${this.baseURL}${endpoint}`;
    return await request.get(url, { headers: this.headers });
  }

  async post(request, endpoint, payload) {
    return await request.post(`${this.baseURL}${endpoint}`, {
      headers: this.headers,
      data: payload,
    });
  }

  async put(request, endpoint, payload) {
    return await request.put(`${this.baseURL}${endpoint}`, {
      headers: this.headers,
      data: payload,
    });
  }

  async patch(request, endpoint, payload) {
    return await request.patch(`${this.baseURL}${endpoint}`, {
      headers: this.headers,
      data: payload,
    });
  }

  async delete(request, endpoint) {
    return await request.delete(`${this.baseURL}${endpoint}`, { headers: this.headers });
  }
}
