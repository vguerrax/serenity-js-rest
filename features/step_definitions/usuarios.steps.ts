import {
  Given, When, Then, DataTable,
} from '@cucumber/cucumber';
import { Ensure, equals, not } from '@serenity-js/assertions';
import { actorInTheSpotlight } from '@serenity-js/core';
import { Send, GetRequest, LastResponse } from '@serenity-js/rest';

import EnsureThatDatabaseHasUsers from '../support/screenplay/tasks/EnsureThatDatabaseHasUsers';

Given('que existam usuários cadastrados', async () => {
  await actorInTheSpotlight().attemptsTo(
    EnsureThatDatabaseHasUsers(),
  );
});

When('ele realiza uma requesição GET para o endpoint {string}', async (endpoint: string) => {
  await actorInTheSpotlight().attemptsTo(
    Send.a(
      GetRequest.to(endpoint),
    ),
  );
});

Then('ele deve ver o status code {int}', async (statusCode: number) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(LastResponse.status(), equals(statusCode)),
  );
});

Then('ele deve ver um JSON com a lista de usuários cadastrados com as seguintes chaves', async (dataTable: DataTable) => {
  dataTable.rows().map((row) => row[0]).forEach(async (key) => {
    const responseArray = LastResponse.body().answeredBy(actorInTheSpotlight());
    responseArray.forEach(async (response: any) => {
      await actorInTheSpotlight().attemptsTo(
        Ensure.that(response[key], not(equals(null))),
      );
    });
  });
});
