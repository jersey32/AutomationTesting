// @ts-check
const { test, expect } = require('@playwright/test');

const headers = {
  'x-api-key': 'reqres-free-v1'
};
let usersid;

test.describe.serial('User API tests', () => {
  test('Get users', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2', { headers });
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });

  test('Create user', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      headers,
      data: { name: 'Jersey', job: 'Playwright Tester' }
    });
    expect(response.status()).toBe(201);
    const responseData = await response.json();
    usersid = responseData.id;
    console.log(responseData);
  });

  test('Update user', async ({ request }) => {
    expect(usersid).toBeTruthy();
    const response = await request.put(`https://reqres.in/api/users/${usersid}`, {
      headers,
      data: { name: 'Jersey', job: 'Project Manager' }
    });
    expect(response.status()).toBe(200);
    console.log(await response.json());
  });

  test('Delete user', async ({ request }) => {
    expect(usersid).toBeTruthy();
    const response = await request.delete(`https://reqres.in/api/users/${usersid}`, { headers });
    expect(response.status()).toBe(204);
  });
});