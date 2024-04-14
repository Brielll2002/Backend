const app = require('../../controller/cadastro/cadastro');
const request = require('supertest');

test('Teste rota "/cadastro"',(done)=>{
    const usuario = JSON.stringify({
        nome: 'Nome',
        sobrenome: 'Sobrenome',
        senha: 'senha123',
        confirmSenha: 'senha123',
        turno: 'manha',
        matricula: '12345678',
        nome_curso: 'Engenharia de Software',
        nome_unidade: 'Universidade XYZ'
     });

    request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .send(usuario)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        console.log("Body:",res.request._data+"\n Res:", res.text)
        if (err){        
            done(err);
        }
        expect(res.statusCode === 200 || res.statusCode === 400 || res.statusCode === 500)
        expect(res.body).toHaveProperty('response');
        expect(res.body).toHaveProperty('message');

        done()
    });

});
