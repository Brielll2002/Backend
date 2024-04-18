const app = require('../../controller/filtro/filtro')
const request = require('supertest')
const { gerarToken } = require('../../token/token')

test('Teste rota "/filtro"', (done) => {
  const token = gerarToken(1)

  const filtro = {
    nome_unidade_post: 'paulista',
    nome_curso_post: 'ads',
    turno: 'manha'
  }

  request(app)
    .get('/filtro')
    .query({id: '1'})
    .send(filtro)
    .set('Authorization', `Bearer ${token}`)
    .expect('Content-Type', /json/)
    .end((err, res) => {

        console.log("Body:",res.request._data+"\n Res:", res.text)
      if (err){
        console.error(err)
        return done(err)
      }

      expect(res.statusCode === 200 || res.statusCode === 400 || res.statusCode === 500)
      expect(res.body).toHaveProperty('response')

      done()
    })
})
