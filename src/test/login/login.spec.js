const app = require('../../controller/login/login')
const request = require('supertest')

test('Teste rota "/login"',(done)=>{

    const usuario = JSON.stringify({
        nome: 'Nome',
        senha: 'senha123',
        matricula: '12345678'
     })

    request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .send(usuario)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        console.log("Body:",res.request._data+"\n Res:", res.text)
        if (err){     
            console.error(err)   
            done(err)
        }
        expect(res.statusCode === 200 || res.statusCode === 400 || res.statusCode === 500)
        expect(res.body).toHaveProperty('response')

        done()
    })

})