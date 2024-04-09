--------------------------------------CADASTRO---------------------------------------------

- API PARA CADASTRO(post): https://backend-3cga.onrender.com/register
  
  Necessário para concluir cadastro:
  nome, sobrenome, senha, confirmSenha, turno, matricula, nome_curso, nome_unidade.

  - API's HELP

    api cursos cadastrados(get): https://backend-3cga.onrender.com/register/cursos

    api unidades cadastradas(get): https://backend-3cga.onrender.com/register/unidades

---------------------------------------LOGIN-----------------------------------------------

- ROTA API LOGIN(post): https://backend-3cga.onrender.com/login

 
  Necessário para concluir login: nome, matricula, senha.

---------------------------------------POST-----------------------------------------------

- ROTA API  CRIAR POST(post): https://backend-3cga.onrender.com/post


  Para acessar a rota de post terá que ter um token gerado ao concluir o login


  Necessário para concluir post: nome_usuario, nome_unidade_post, nome_curso_post, id_user_post, conteudo, turno, imagem(opcional).

- ROTA API DELETAR POST(delete): https://backend-3cga.onrender.com/post/delete/:id


  Para acessar a rota de post terá que ter um token gerado ao concluir o login


  Necessário para deletar o post: post/delete/:id.

---------------------------------------HOME-----------------------------------------------

- ROTA API HOME(get): https://backend-3cga.onrender.com/home/:pg


  Para acessar a rota da home terá que ter um token gerado ao concluir o login
  

  Necessário para concluir a busca dos posts da home: home/:pg.

  obs: A ':pg'(página) é referente ao esquema de paginação, usado para não enviar muitos dados de uma vez na api.

--------------------------------------COMENTÁRIO------------------------------------------

- ROTA API COMENTARIO(post): https://backend-3cga.onrender.com/comentario


  Para acessar a rota da comentario terá que ter um token gerado ao concluir o login
  

  Necessário para concluir comentário: conteudo, nome, id_user_comentario, id_post_comentario.
  

  - API's HELP

    api comentários existente no post(get): https://backend-3cga.onrender.com/comentario/buscar

    Para acessar a rota de buscar comentario terá que ter um token gerado ao concluir o login

    Necessário para concluir a busca do comentário: id_post_comentario.

  
--------------------------------------FILTRO-------------------------------------------

- ROTA API FILTRO(get): https://backend-3cga.onrender.com/filtro/:pg
 
  Para acessar a rota da filtro terá que ter um token gerado ao concluir o login

  Necessário para concluir o filtro: nome_unidade_post, nome_curso_post, turno, filtro/:pg(params).

  obs: A ':pg'(página) é referente ao esquema de paginação, usado para não enviar muitos dados de uma vez na api.


--------------------------------------PERFIL-------------------------------------------

- ROTA API PERFIL(get): https://backend-3cga.onrender.com/perfil/:id

  Para acessar a rota de perfil terá que ter um token gerado ao concluir o login

  Necessário para concluir a busca do perfil: perfil/:id.
  
- ROTA API EDITAR PERFIL(put): https://backend-3cga.onrender.com/perfil/editar/:id

  Para acessar a rota de perfil terá que ter um token gerado ao concluir o login

  Necessário para concluir a atualização do perfil: editar/:id(params), senha, turno, matricula, nome_curso, nome_unidade.
