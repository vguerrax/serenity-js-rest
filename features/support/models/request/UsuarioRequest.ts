import { Payload } from '../types/Paylaoad';
import { Request } from './Request';

export type UsuarioPayload = Payload & {
  nome: string | null,
  email: string | null,
  password: string | null,
  perfil_id: number | null,
}

export class UsuarioRequest implements Request {
  private payload: UsuarioPayload;

  private constructor() {
    this.payload = {
      nome: null,
      email: null,
      password: null,
      perfil_id: null,
    };
  }

  static createPayload(): UsuarioRequest {
    return new UsuarioRequest();
  }

  withName(nome: string): UsuarioRequest {
    this.payload.nome = nome;
    return this;
  }

  withEmail(email: string): UsuarioRequest {
    this.payload.email = email;
    return this;
  }

  withPassword(password: string): UsuarioRequest {
    this.payload.password = password;
    return this;
  }

  withPerfilId(perfilId: number): UsuarioRequest {
    this.payload.perfil_id = perfilId;
    return this;
  }

  build(): UsuarioPayload {
    return this.payload;
  }
}
