# encoding: utf-8
# language: pt

Funcionalidade: Gerenciar Usuários

    Contexto:
        Dado que o usuário esteja logado com permissão de administrador

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
            | permissao        |

