import Usuario from './features/support/models/request/UsuarioRequest';

const usuario = Usuario.createPayload();

console.log(usuario.withName('Test').withEmail('teste@email').withPassword('123456').withPerfilId(1)
  .toJson());
