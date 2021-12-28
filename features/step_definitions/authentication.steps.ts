import { Given, AfterAll } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight, Interaction } from '@serenity-js/core';
import { LastResponse, ChangeApiConfig } from '@serenity-js/rest';

import Config from '../../test_config';
import { getRoleByName } from '../support/enums/roles';

import GetAuthenticationTokenFor from '../support/screenplay/tasks/GetAuthenticationTokenFor';
import QueryMariaDb from '../support/screenplay/abilities/QueryMariaDb';

Given('que o usuário esteja logado com permissão de {word}', async (role: string) => {
  const userKey = getRoleByName(role);
  const user = Config.users[userKey];
  const { email, password } = user;
  await actorCalled(user.name).attemptsTo(
    GetAuthenticationTokenFor({ email, password }),
  );
  await actorInTheSpotlight().attemptsTo(
    ChangeApiConfig.setHeader(
      'Authorization',
      `Bearer ${LastResponse.body().answeredBy(actorInTheSpotlight()).token}`,
    ),
  );
});
AfterAll(() => {
  actorCalled('System').attemptsTo(
    Interaction.where('#actor ends the database connection', (actor) => QueryMariaDb.as(actor).end()),
  );
});
