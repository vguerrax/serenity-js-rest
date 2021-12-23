// import { Ensure, startsWith } from '@serenity-js/assertions';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { Interaction, Task } from '@serenity-js/core';
import bcryptjs from 'bcryptjs';
import moment from 'moment';

import Config from '../../../../test_config';
import QueryMariaDb, { NumberOfUsersInDatabse } from '../abilities/QueryMariaDb';

// import * as noteKeys from '../../enums/key_notes';
// import TheAuthenticationTokenValue from '../questions/TheAuthenticationTokenValue';

const selectQuery = 'SELECT * FROM usuarios';
const insertQuery = `INSERT INTO usuarios (nome, email, password, perfil_id, created_at, updated_at)
VALUES ('Automated', 'automated@email.com', '${bcryptjs.hashSync('automated', 8)}', 1, '${moment().format(Config.databaseDatetimeFormat)}', '${moment().format(Config.databaseDatetimeFormat)}')`;

const EnsureThatDatabaseHasUsers = () => Task.where(
  '#actor ensure that database has users',
  Interaction.where('#actor verify if database has users', (actor) => QueryMariaDb.as(actor).selectAndInsertIfNotExists(selectQuery, insertQuery)),
  Ensure.that(NumberOfUsersInDatabse(), isGreaterThan(0)),
);

export default EnsureThatDatabaseHasUsers;
