const app = require('../../controller/comentario/comentario')
const request = require('supertest')
const {gerarToken} = require('../../token/token')

test('Teste rota "/comentario"',(done)=>{
    const token = gerarToken(1)

    const post = JSON.stringify({
        conteudo: 'Rodando os testes',
        nome: 'Nome',
        id_user_comentario: 43,
        id_post_comentario: 9,
     })

    request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(post)
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