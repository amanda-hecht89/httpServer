import request from 'supertest';
import { serve } from './server.js';

describe('The TCP server', () => {
  let server = null;

  beforeEach(() => {
    // Deliberately omit the port so we get an available one.
    server = serve('localhost', undefined);
  });

  afterEach(() => {
    server.close();
  });

  // This test will fail initially since the project doesn't start with a
  // working HTTP server.
  it('connects on the default port', async () => {
     const res = await request(server)
      .get('/')
      .expect(200);
      console.log('hey',res);
      expect(res.text).toEqual(`<html> 
    <main>
        <h1> Hi! Im Amanda! </h1>
        <article>
        <h2>Im a Computer Engineer</h2>
        <p> I have lots of pets!</p>
        </article>
    </main>
    </html>`);
      
  });

  it('connects to the post route with JSON', async () => {
  
    await request(server)
      .get('/posts')
      .expect(200)
      .expect('Content-Type', 'application/json')
  });

  it('receives a 404 when requesting an unknown resource/method', async () => {
    await request(server)
      .put('/fictitious')
      .expect(404);
  });

  it('get a 204 when post request is made', async () => {
    await request(server)
      .post('/mail')
      .expect(204)
      .expect('Content-Type', 'application/json')
  });

});
