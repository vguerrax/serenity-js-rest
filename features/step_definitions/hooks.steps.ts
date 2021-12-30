import { AfterAll } from '@cucumber/cucumber';
import { actorCalled, Interaction } from '@serenity-js/core';
import { QueryMariaDb } from '../support/screenplay';

AfterAll(() => {
  actorCalled('System').attemptsTo(
    Interaction.where('#actor ends the database connection', (actor) => QueryMariaDb.as(actor).end()),
  );
});
