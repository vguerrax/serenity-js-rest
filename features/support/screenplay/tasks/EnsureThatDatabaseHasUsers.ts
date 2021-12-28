import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { Interaction, TakeNote, Task } from '@serenity-js/core';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import bcryptjs from 'bcryptjs';

import QueryMariaDb, { NumberOfUsersInDatabse, TheResultOfQuery } from '../abilities/QueryMariaDb';

import notesKeys from '../../enums/notes_keys';

const selectQuery = 'SELECT * FROM usuarios ORDER BY id DESC';

const script = readFileSync(resolve(__dirname, '..', '..', 'resources', 'scripts', 'usuarios.sql'), 'utf8')
  .replaceAll('#password', bcryptjs.hashSync('123456', 8));
const EnsureThatDatabaseHasUsers = () => Task.where(
  '#actor ensure that database has users',
  Interaction.where('#actor executes database script to add users', (actor) => QueryMariaDb.as(actor).script(script)),
  Ensure.that(NumberOfUsersInDatabse(), isGreaterThan(0)),
  TakeNote.of(TheResultOfQuery(selectQuery)).as(notesKeys.QueryResult),
);

export default EnsureThatDatabaseHasUsers;
