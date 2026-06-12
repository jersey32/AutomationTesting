import { test, expect } from '@playwright/test';

const BASE_URL = process.env.API_BASE_URL;
const HEADERS = {
  'x-api-key': process.env.API_KEY,
  'Content-Type': 'application/json',
};

// GET /users
test('GET /users - returns list of users', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/users?page=1`, { headers: HEADERS });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('data');
  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.data[0]).toMatchObject({
    id: expect.any(Number),
    email: expect.any(String),
    first_name: expect.any(String),
    last_name: expect.any(String),
  });
});

// GET /users/:id
test('GET /users/:id - returns a single user', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/users/2`, { headers: HEADERS });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.data).toMatchObject({
    id: 2,
    email: expect.any(String),
    first_name: expect.any(String),
    last_name: expect.any(String),
  });
});

// GET /users/:id - not found
test('GET /users/:id - returns 404 for non-existent user', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/users/9999`, { headers: HEADERS });
  expect(res.status()).toBe(404);
});

// POST /users
test('POST /users - creates a new user', async ({ request }) => {
  const payload = { name: 'John Doe', job: 'QA Engineer' };
  const res = await request.post(`${BASE_URL}/users`, { headers: HEADERS, data: payload });
  expect(res.status()).toBe(201);

  const body = await res.json();
  expect(body).toMatchObject({ name: 'John Doe', job: 'QA Engineer' });
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('createdAt');
});

// PUT /users/:id
test('PUT /users/:id - updates a user', async ({ request }) => {
  const payload = { name: 'Jane Doe', job: 'Lead QA' };
  const res = await request.put(`${BASE_URL}/users/2`, { headers: HEADERS, data: payload });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toMatchObject({ name: 'Jane Doe', job: 'Lead QA' });
  expect(body).toHaveProperty('updatedAt');
});

// PATCH /users/:id
test('PATCH /users/:id - partially updates a user', async ({ request }) => {
  const payload = { job: 'Senior QA' };
  const res = await request.patch(`${BASE_URL}/users/2`, { headers: HEADERS, data: payload });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toMatchObject({ job: 'Senior QA' });
  expect(body).toHaveProperty('updatedAt');
});

// DELETE /users/:id
test('DELETE /users/:id - deletes a user', async ({ request }) => {
  const res = await request.delete(`${BASE_URL}/users/2`, { headers: HEADERS });
  expect(res.status()).toBe(204);
});

// POST /register
test('POST /register - registers a user successfully', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in', password: 'pistol' };
  const res = await request.post(`${BASE_URL}/register`, { headers: HEADERS, data: payload });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('token');
});

// POST /register - missing password
test('POST /register - returns 400 when password is missing', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in' };
  const res = await request.post(`${BASE_URL}/register`, { headers: HEADERS, data: payload });
  expect(res.status()).toBe(400);

  const body = await res.json();
  expect(body).toHaveProperty('error');
});

// POST /login
test('POST /login - logs in successfully', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
  const res = await request.post(`${BASE_URL}/login`, { headers: HEADERS, data: payload });
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('token');
});

// POST /login - missing password
test('POST /login - returns 400 when password is missing', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in' };
  const res = await request.post(`${BASE_URL}/login`, { headers: HEADERS, data: payload });
  expect(res.status()).toBe(400);

  const body = await res.json();
  expect(body).toHaveProperty('error');
});