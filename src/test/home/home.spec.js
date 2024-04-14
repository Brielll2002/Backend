const app = require('../../controller/home/home');
const request = require('supertest');
const { gerarToken } = require('../../token/token');

test('Teste rota "/home"', (done) => {
  const token = gerarToken(1);

  request(app)
    .get('/home')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .end((err, res) => {

      console.log("Res:",res.text)
      if (err){
        return done(err);
      }

      expect(res.statusCode === 200 || res.statusCode === 400 || res.statusCode === 500)
      expect(res.body).toHaveProperty('response');

      done();
    });
});
