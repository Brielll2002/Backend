const app = require('../../controller/perfil/editarPerfil')
const request = require('supertest')
const {gerarToken} = require('../../token/token')

test('Teste rota "/perfl/editar"',(done)=>{

    const token = gerarToken(1)

    const usuario = JSON.stringify({
        nome: 'Nome',
        senha: 'senha123',
        turno: 'manha',
        matricula: '12345678',
        nome_curso: 'Engenharia de Software',
        nome_unidade: 'Universidade XYZ'
     })

    request(app)
      .put('/43')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
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