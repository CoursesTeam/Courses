'use strict';

const {server} = require('../src/server');
const supertest = require('supertest');
const request = supertest(server);

describe ('express server' , ()=> {

  it('shoud check if it Working successfully', async()=> {
    //arange
    let param = '/';
    let status = 200;
    let text = 'Hello world';

    //act 
    const response = await request.get(param);
    
    // assert
    expect(response.status).toBe(status);
    expect(response.text).toBe(text);
  });

  it('should check 500 errors', async()=> {
    //arange
    let param = '/bad';
    let status = 500;

    //act 
    const response = await request.get(param);

    // assert
    expect(response.status).toBe(status);
    expect(response.body.route).toBe(param);
  });

  it('shoud check 404 errors', async()=> {
    //arange

    let param = '/notfound';
    let status = 404;

    //act
    const response = await request.get(param);

    // assert
    expect(response.status).toBe(status);
  });

  ///  status
  it('check for the get /user status', async () => {
    const response = await request.get('/users'); 
    expect(response.status).toBe(200);
  });

  it('check for the get /users:id status', async () => {
    const response = await request.get('/users/1'); 
    expect(response.status).toBe(200);
  });

  it('check for the status for the POST', async () => {
    const studentObj={
      'userName': 'suad',
      'userMjor': 'programmer',
   
    };
    const response = await request.post('/users').send(studentObj); 
    expect(response.status).toBe(201);
  });

  it('check for the status for the update', async () => {
    const response = await request.put('/users/2'); 
    expect(response.status).toBe(200);
  });
  
  it('check for the status for the delete', async () => {
    const response = await request.delete('/users/1'); 
    expect(response.status).toBe(204);
  });

  ///  status
  it('check for the get /courses status', async () => {
    const response = await request.get('/courses'); 
    expect(response.status).toBe(200);
  });
  
  it('check for the get /courses:id status', async () => {
    const response = await request.get('/courses/1'); 
    expect(response.status).toBe(200);
  });
  
  it('check for the status for the POST', async () => {
    const courseObj={
      'title': 'math',
      ' course_description': 'summation',
    };
    const response = await request.post('/courses').send(courseObj); 
    expect(response.status).toBe(201);
  });
  
  it('check for the status for the update', async () => {
    const response = await request.put('/courses/12'); 
    expect(response.status).toBe(200);
  });
    
  it('check for the status for the delete', async () => {
    const response = await request.delete('/courses/1'); 
    expect(response.status).toBe(204);
  });

});