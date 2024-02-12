
import http from 'http';

jest.useFakeTimers();

describe('User API', () => {
  const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/users',
    method: 'GET',
  };

  it('Get all records with a GET api/users request', (done) => {
    const req = http.request(options, (res) => {
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

    req.on('error', (error) => {
      req.end();
      done(error);
    });

    req.end();
  });
});