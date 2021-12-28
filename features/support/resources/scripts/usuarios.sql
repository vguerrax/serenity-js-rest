DELETE FROM escola.usuarios WHERE id > 3;
INSERT INTO usuarios (nome, email, password_hash, perfil_id, created_at, updated_at) VALUES ('Josefa', 'josefa@email.com', '#password', 3, now(), now());
INSERT INTO usuarios (nome, email, password_hash, perfil_id, created_at, updated_at) VALUES ('Jose', 'jose@email.com', '#password', 3, now(), now());
INSERT INTO usuarios (nome, email, password_hash, perfil_id, created_at, updated_at) VALUES ('Luiz', 'luiz@email.com', '#password', 3, now(), now());
