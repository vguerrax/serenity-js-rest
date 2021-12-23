import {
  Ability, Discardable, Initialisable, Question, UsesAbilities,
} from '@serenity-js/core';
import { Pool } from 'mariadb';

class QueryMariaDb implements Initialisable, Discardable, Ability {
  static as(actor: UsesAbilities): QueryMariaDb {
    return actor.abilityTo(QueryMariaDb);
  }

  initialise(): void | Promise<void> {
    return Promise.resolve();
  }

  isInitialised(): boolean {
    return this.pool.activeConnections() > 0;
  }

  discard(): void | Promise<void> {
    this.pool.end();
  }

  // eslint-disable-next-line no-empty-function, no-unused-vars
  constructor(private pool: Pool) {}

  query(query: string) {
    return this.pool.query(query);
  }

  async selectAndInsertIfNotExists(selectQuery: string, insertQuery: string) {
    const result = await this.query(selectQuery);
    if (result.length <= 0) {
      this.query(insertQuery);
    }
  }
}

export const NumberOfUsersInDatabse = () => Question.about('number of users in the database', (actor) => QueryMariaDb.as(actor)
  .query('SELECT COUNT(*) as count FROM usuarios')
  .then((result) => result[0].count));

export const NumberOfStudentsInDatabse = () => Question.about('number of students in the database', (actor) => QueryMariaDb.as(actor)
  .query('SELECT COUNT(*) as count FROM alunos')
  .then((result) => result[0].count));

export default QueryMariaDb;
