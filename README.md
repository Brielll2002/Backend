--------------------------------------CADASTRO---------------------------------------------

- API PARA CADASTRO(post): https://backend-3cga.onrender.com/register
  
  Necessário para concluir cadastro:
nome, sobrenome, senha, confirmSenha, turno, matricula, nome_curso, nome_unidade.

- API's HELP

  api cursos cadastrados(get): https://backend-3cga.onrender.com/register/cursos

  api unidades cadastradas(get): https://backend-3cga.onrender.com/register/unidades

---------------------------------------LOGIN-----------------------------------------------

- ROTA API LOGIN(post): https://backend-3cga.onrender.com/login
- 
- Necessário para concluir login: nome, matricula, senha.

---------------------------------------POST-----------------------------------------------

- ROTA API POST(post): https://backend-3cga.onrender.com/post
-
- Para acessar a rota de post terá que ter um token gerado ao concluir o login
- 
- Necessário para concluir post: nome_usuario, nome_unidade_post, nome_curso_post, id_user_post, conteudo, imagem(opcional).

---------------------------------------HOME-----------------------------------------------

- ROTA API HOME(get): https://backend-3cga.onrender.com/home
-
- Para acessar a rota da home terá que ter um token gerado ao concluir o login

- ------------------------------------COMENTÁRIO------------------------------------------

- ROTA API COMENTARIO(post): https://backend-3cga.onrender.com/comentario
-
- Para acessar a rota da home terá que ter um token gerado ao concluir o login
-
- API's HELP
- api comentários existente no post: https://backend-3cga.onrender.com/comentario/buscar
