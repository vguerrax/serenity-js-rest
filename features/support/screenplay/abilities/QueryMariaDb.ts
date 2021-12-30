import { Ability, UsesAbilities } from '@serenity-js/core';
import { Pool } from 'mariadb';

export class QueryMariaDb implements Ability {
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
