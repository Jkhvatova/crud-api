
import {  request } from 'http';

describe('User API', () => {
  it('Get all records with a GET api/users request', (done) => {
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/users',
      method: 'GET',
    };

    const req = request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(data)).toEqual([]);
        done();
      });
    });

    req.end();
  });
});