const app = require('../../controller/home/home');
const request = require('supertest');
const { gerarToken } = require('../../token/token');

test('Teste rota "/"', (done) => {
  const token = gerarToken(1);

  request(app)
    .get('/home')
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .expect(200 || 400)
    .end((err, res) => {

      console.log("Res:",res.text)
      if (err){
        return done(err);
      }

      done();
    });
});
