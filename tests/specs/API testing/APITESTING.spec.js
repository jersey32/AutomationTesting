import { test, expect } from '@playwright/test';
import { APIClient } from '../../pages/APIClient.js';

const BASE_URL = process.env.API_BASE_URL;
const HEADERS = {
  'x-api-key': process.env.API_KEY,
  'Content-Type': 'application/json',
};

const apiClient = new APIClient(BASE_URL, HEADERS);

test('GET /users - returns list of users', async ({ request }) => {
  const res = await apiClient.get(request, '/users', { page: 1 });
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

test('GET /users/:id - returns a single user', async ({ request }) => {
  const res = await apiClient.get(request, '/users/2');
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.data).toMatchObject({
    id: 2,
    email: expect.any(String),
    first_name: expect.any(String),
    last_name: expect.any(String),
  });
});

test('GET /users/:id - returns 404 for non-existent user', async ({ request }) => {
  const res = await apiClient.get(request, '/users/9999');
  expect(res.status()).toBe(404);
});

test('POST /users - creates a new user', async ({ request }) => {
  const payload = { name: 'John Doe', job: 'QA Engineer' };
  const res = await apiClient.post(request, '/users', payload);
  expect(res.status()).toBe(201);

  const body = await res.json();
  expect(body).toMatchObject({ name: 'John Doe', job: 'QA Engineer' });
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('createdAt');
});

test('PUT /users/:id - updates a user', async ({ request }) => {
  const payload = { name: 'Jane Doe', job: 'Lead QA' };
  const res = await apiClient.put(request, '/users/2', payload);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toMatchObject({ name: 'Jane Doe', job: 'Lead QA' });
  expect(body).toHaveProperty('updatedAt');
});

test('PATCH /users/:id - partially updates a user', async ({ request }) => {
  const payload = { job: 'Senior QA' };
  const res = await apiClient.patch(request, '/users/2', payload);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toMatchObject({ job: 'Senior QA' });
  expect(body).toHaveProperty('updatedAt');
});

test('DELETE /users/:id - deletes a user', async ({ request }) => {
  const res = await apiClient.delete(request, '/users/2');
  expect(res.status()).toBe(204);
});

test('POST /register - registers a user successfully', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in', password: 'pistol' };
  const res = await apiClient.post(request, '/register', payload);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('token');
});

test('POST /register - returns 400 when password is missing', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in' };
  const res = await apiClient.post(request, '/register', payload);
  expect(res.status()).toBe(400);

  const body = await res.json();
  expect(body).toHaveProperty('error');
});

test('POST /login - logs in successfully', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in', password: 'cityslicka' };
  const res = await apiClient.post(request, '/login', payload);
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body).toHaveProperty('token');
});

test('POST /login - returns 400 when password is missing', async ({ request }) => {
  const payload = { email: 'eve.holt@reqres.in' };
  const res = await apiClient.post(request, '/login', payload);
  expect(res.status()).toBe(400);

  const body = await res.json();
  expect(body).toHaveProperty('error');
});