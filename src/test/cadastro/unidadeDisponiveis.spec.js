const app = require('../../controller/cadastro/unidadeDisponiveis')
const request = require('supertest')

test('Teste rota "/register/unidades"', (done) => {

  request(app)
    .get('/')
    .expect('Content-Type', /json/)
    .end((err, res) => {

      console.log("Res:",res.text)
      if (err){
        console.error(err)
        return done(err)
      }

      expect(res.statusCode === 200 || res.statusCode === 400 || res.statusCode === 500)
      expect(res.body).toHaveProperty('response')

      done()
    })

})
