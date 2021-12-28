# encoding: utf-8
# language: pt

Funcionalidade: Gerenciar Usuários

  Contexto:
    Dado que o usuário esteja logado com permissão de administrador

  @automated
  Cenário: Listar usuários
    E que existam usuários cadastrados
    Quando ele realiza uma requesição GET para o endpoint '/v2/usuarios'
    Então ele deve ver o status code 200
    E ele deve ver um JSON com a lista de usuários cadastrados com as seguintes chaves
      | id               |
      | nome             |
      | email            |
      | created_at       |
      | updated_at       |
      | permissao.id     |
      | permissao.perfil |

  @automated
  Cenário: Visualizar usuário
    E que existam usuários cadastrados
    Quando ele realiza uma requesição GET para o endpoint '/v2/usuarios/{usuarioId}'
    Então ele deve ver o status code 200
    E ele deve ver um JSON com o usuário informado com as seguintes chaves
      | id               |
      | nome             |
      | email            |
      | created_at       |
      | updated_at       |
      | permissao        |
      | permissao.id     |
      | permissao.perfil |

  @automated
  Cenário: Cadastrar usuário
    Quando ele informa o payload para cadastrar um usuário
    E ele realiza uma requesição POST para o endpoint '/v2/usuarios'
    Então ele deve ver o status code 201
    E ele deve ver um JSON com o usuário cadastrado com as seguintes chaves
      | id               |
      | nome             |
      | email            |
      | created_at       |
      | updated_at       |
      | permissao        |
      | permissao.id     |
      | permissao.perfil |

  @automated
  Esquema do Cenário: Cadastrar usuário sem dados obrigatórios
    Quando ele informa o payload para cadastrar um usuário
    Mas ele não informa a chave '<chave>'
    E ele realiza uma requesição POST para o endpoint '/v2/usuarios'
    Então ele deve ver o status code 400
    E ele deve ver a mensagem '<mensagem>' no array do objeto 'errors'

    Exemplos:
      | chave     | mensagem                                 |
      | nome      | O nome deve ter entre 3 e 255 caracteres |
      | email     | O email deve ser válido.                 |
      | perfil_id | O id do perfil deve ser válido           |
      | password  | A senha deve ter entre 6 e 50 caracteres |

  @automated
  Esquema do Cenário: Cadastrar usuário com dados inválidos
    Quando ele informa o payload para cadastrar um usuário
    E ele informa o valor '<valor>' na chave '<chave>'
    E ele realiza uma requesição POST para o endpoint '/v2/usuarios'
    Então ele deve ver o status code 400
    E ele deve ver a mensagem '<mensagem>' no array do objeto 'errors'

    Exemplos:
      | chave     | mensagem                                 | valor                                                                                                                                                                                                                                                            |
      | nome      | O nome deve ter entre 3 e 255 caracteres | AT                                                                                                                                                                                                                                                               |
      | nome      | O nome deve ter entre 3 e 255 caracteres | abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv |
      | perfil_id | O id do perfil precisa ser um inteiro    | a                                                                                                                                                                                                                                                                |
      | perfil_id | O id do perfil deve ser válido           | 0                                                                                                                                                                                                                                                                |
      | password  | A senha deve ter entre 6 e 50 caracteres | 12345                                                                                                                                                                                                                                                            |
      | password  | A senha deve ter entre 6 e 50 caracteres | 123456789012345678901234567890123456789012345678901                                                                                                                                                                                                              |
      | email     | O email deve ser válido.                 | email@email                                                                                                                                                                                                                                                      |
      | email     | Email já existe.                         | admin@email.com                                                                                                                                                                                                                                                  |

  @automated
  Cenário: Editar usuário
    E que existam usuários cadastrados
    Quando ele informa o payload para editar um usuário
    E ele realiza uma requesição PUT para o endpoint '/v2/usuarios/{usuarioId}'
    Então ele deve ver o status code 200
    E ele deve ver um JSON com o usuário alterado com as seguintes chaves
      | id               |
      | nome             |
      | email            |
      | created_at       |
      | updated_at       |
      | permissao        |
      | permissao.id     |
      | permissao.perfil |

  @automated
  Esquema do Cenário: Editar usuário com dados inválidos
    E que existam usuários cadastrados
    Quando ele informa o payload para editar um usuário
    E ele informa o valor '<valor>' na chave '<chave>'
    E ele realiza uma requesição PUT para o endpoint '/v2/usuarios/{usuarioId}'
    Então ele deve ver o status code 400
    E ele deve ver a mensagem '<mensagem>' no array do objeto 'errors'

    Exemplos:
      | chave     | mensagem                                 | valor                                                                                                                                                                                                                                                            |
      | nome      | O nome deve ter entre 3 e 255 caracteres | AT                                                                                                                                                                                                                                                               |
      | nome      | O nome deve ter entre 3 e 255 caracteres | abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuv |
      | perfil_id | O id do perfil precisa ser um inteiro    | a                                                                                                                                                                                                                                                                |
      | perfil_id | O id do perfil deve ser válido           | 0                                                                                                                                                                                                                                                                |
      | password  | A senha deve ter entre 6 e 50 caracteres | 12345                                                                                                                                                                                                                                                            |
      | password  | A senha deve ter entre 6 e 50 caracteres | 123456789012345678901234567890123456789012345678901                                                                                                                                                                                                              |
      | email     | O email deve ser válido.                 | email@email                                                                                                                                                                                                                                                      |
      | email     | Email já existe.                         | admin@email.com                                                                                                                                                                                                                                                  |

  @automated
  Cenário: Deletar usuário
    E que existam usuários cadastrados
    E ele realiza uma requisição DELETE para o endpoint '/v2/usuarios/{usuarioId}'
    Então ele deve ver o status code 204

  @automated
  Cenário: Deletar usuário inexistente
    Quando ele informa um usuário inexistente
    E ele realiza uma requisição DELETE para o endpoint '/v2/usuarios/{usuarioId}'
    Então ele deve ver o status code 404
