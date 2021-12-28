import { Ability, Question, UsesAbilities } from '@serenity-js/core';
import { Pool } from 'mariadb';

class QueryMariaDb implements Ability {
  static as(actor: UsesAbilities): QueryMariaDb {
    return actor.abilityTo(QueryMariaDb);
  }

  static using(pool: Pool) {
    return new QueryMariaDb(pool);
  }

  // eslint-disable-next-line no-empty-function, no-unused-vars
  constructor(private pool: Pool) {}

  async end() {
    await this.pool.end();
  }

  query(query: string) {
    return this.pool.query(query);
  }

  async script(script: string) {
    const queryObject = {
      multipleStatements: true,
      sql: script,
    };
    await this.pool.query(queryObject);
  }

  async countTableAndInsertIfNotExists(table: string, insertQuery: string) {
    const result = await this.query(`SELECT COUNT(*) as count FROM ${table}`);
    if (result[0].count <= 0) {
      await this.query(insertQuery);
    }
  }
}

export const TheResultOfQuery = (query: string) => Question.about('the last query', (actor) => QueryMariaDb.as(actor)
  .query(query)
  .then((result) => result));

export const NumberOfUsersInDatabse = () => Question.about('number of users in the database', (actor) => QueryMariaDb.as(actor)
  .query('SELECT COUNT(*) as count FROM usuarios')
  .then((result) => result[0].count));

export const NumberOfStudentsInDatabse = () => Question.about('number of students in the database', (actor) => QueryMariaDb.as(actor)
  .query('SELECT COUNT(*) as count FROM alunos')
  .then((result) => result[0].count));

export default QueryMariaDb;
