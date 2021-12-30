import { Given } from '@cucumber/cucumber';
import { actorCalled, actorInTheSpotlight } from '@serenity-js/core';
import { LastResponse, ChangeApiConfig } from '@serenity-js/rest';

import Config from '../../test_config';
import { getRoleByName } from '../support/enums';

import { GetAuthenticationTokenFor } from '../support/screenplay';

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
