'use strict';
const { app } = require('../server');
const supertest = require('supertest');
const request = supertest(app);
describe('express server', () => {
  it('shoud check the Working... works successfully', async () => {
    //arange
    let param = '/';
    let status = 200;
    let text = 'Hello World!';
    //act 
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
    expect(response.text).toBe(text);
  });
  it('shoud check 404 errors', async () => {
    //arange
    let param = '/notfound';
    let status = 500;
    //act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
  let user = {
    username: 'suad',
    password: '12345',
  };
  it('test for creating a user in post method signup', async () => {
    const response = await request.post('/signup').send(user);
    expect(response.status).toBe(500);
  });
  it('signin no access', async () => {
    const response = await request.post('/signin').auth('suad', 'suad');
    expect(response.status).toBe(403);
  });
});