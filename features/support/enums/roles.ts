export const ADMINISTRADOR = 'admin';
export const ALUNO = 'aluno';
export const PROFESSOR = 'professor';

export const getRoleByName = (name: string) => {
  switch (name) {
    case 'aluno':
      return ALUNO;
    case 'professor':
      return PROFESSOR;
    case 'administrador':
    default:
      return ADMINISTRADOR;
  }
};
