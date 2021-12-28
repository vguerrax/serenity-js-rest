import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { Interaction, TakeNote, Task } from '@serenity-js/core';
import moment from 'moment';

import Config from '../../../../test_config';
import QueryMariaDb, { NumberOfStudentsInDatabse, TheResultOfQuery } from '../abilities/QueryMariaDb';

import notesKeys from '../../enums/notes_keys';

const selectQuery = 'SELECT * FROM alunos';
const insertQuery = `INSERT INTO alunos (nome, sobrenome, email, idade, peso, altura, created_at, updated_at)
VALUES ('Automated', 'Tests', 'automated@email.com', 20, 0, 0, '${moment().format(Config.databaseDatetimeFormat)}', '${moment().format(Config.databaseDatetimeFormat)}')`;

const EnsureThatDatabaseHasStudents = () => Task.where(
  '#actor ensure that database has students',
  Interaction.where('#actor verify if database has students', (actor) => QueryMariaDb.as(actor).countTableAndInsertIfNotExists('alunos', insertQuery)),
  Ensure.that(NumberOfStudentsInDatabse(), isGreaterThan(0)),
  TakeNote.of(TheResultOfQuery(selectQuery)).as(notesKeys.QueryResult),
);

export default EnsureThatDatabaseHasStudents;
