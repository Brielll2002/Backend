const app = require('../../controller/post/post')
const request = require('supertest')
const {gerarToken} = require('../../token/token')

test('Teste rota "/post"',(done)=>{
    const token = gerarToken(1)
    
    const post = JSON.stringify({
        conteudo: 'Rodando os testes - Postando Publicação',
        nome_usuario: 'Nome',
        imagem: "",
        nome_curso_post: 'Engenharia de Software',
        nome_unidade_post: 'Universidade XYZ',
        id_user_post: 43,
        turno: 'manha'
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