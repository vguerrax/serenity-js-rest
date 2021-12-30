import {
  Given, When, Then, DataTable,
} from '@cucumber/cucumber';
import { contain, Ensure, equals } from '@serenity-js/assertions';
import {
  actorInTheSpotlight, Note, Question, TakeNote,
} from '@serenity-js/core';
import {
  Send, GetRequest, LastResponse, PostRequest, PutRequest, DeleteRequest,
} from '@serenity-js/rest';

import {
  EnsureThatDatabaseHasUsers,
  ExpectedPropertyValue,
  listOfObjectsHasProperties,
  objectHasTheProperties,
  objectHasThePropertiesWithTheValues,
} from '../support/screenplay';
import { NoteKeys } from '../support/enums';
import { Payload, Request, UsuarioRequest } from '../support/models';

Given('que existam usuários cadastrados', async () => {
  await actorInTheSpotlight().attemptsTo(
    EnsureThatDatabaseHasUsers(),
  );
});

When('ele realiza uma requesição GET para o endpoint {string}', async (endpoint: string) => {
  const pathParamRegExp = /\{\w+\}/;
  const pathParam = endpoint.match(pathParamRegExp);
  if (pathParam) {
    let queryResult: any;
    switch (pathParam[0]) {
      case '{usuarioId}':
        queryResult = await Note.of(NoteKeys.QueryResult)
          .answeredBy(actorInTheSpotlight());
        await actorInTheSpotlight().attemptsTo(
          Send.a(
            GetRequest.to(endpoint.replace(pathParamRegExp, queryResult[0].id)),
          ),
        );
        break;
      case '{alunoId}':
      default:
        break;
    }
  } else {
    await actorInTheSpotlight().attemptsTo(
      Send.a(
        GetRequest.to(endpoint),
      ),
    );
  }
});

When('ele realiza uma requesição POST para o endpoint {string}', async (endpoint: string) => {
  const payload: Request = await actorInTheSpotlight().answer(Note.of(NoteKeys.Payload));
  await actorInTheSpotlight().attemptsTo(
    Send.a(
      PostRequest.to(endpoint).with(payload).using({ headers: { 'Content-Type': 'application/json' } }),
    ),
  );
});

When('ele realiza uma requesição PUT para o endpoint {string}', async (endpoint: string) => {
  const payload = await actorInTheSpotlight().answer(Note.of(NoteKeys.Payload));
  const pathParamRegExp = /\{\w+\}/;
  const pathParam = endpoint.match(pathParamRegExp);
  if (pathParam) {
    let queryResult: any;
    switch (pathParam[0]) {
      case '{usuarioId}':
        queryResult = await Note.of(NoteKeys.QueryResult)
          .answeredBy(actorInTheSpotlight());
        await actorInTheSpotlight().attemptsTo(
          Send.a(
            PutRequest.to(endpoint.replace(pathParamRegExp, queryResult[0].id)).with(payload)
              .using({ headers: { 'Content-Type': 'application/json' } }),
          ),
        );
        break;
      case '{alunoId}':
      default:
        break;
    }
  } else {
    await actorInTheSpotlight().attemptsTo(
      Send.a(
        PutRequest.to(endpoint).with(payload)
          .using({ headers: { 'Content-Type': 'application/json' } }),
      ),
    );
  }
});

When('ele realiza uma requisição DELETE para o endpoint {string}', async (endpoint: string) => {
  const pathParamRegExp = /\{\w+\}/;
  const pathParam = endpoint.match(pathParamRegExp);
  if (pathParam) {
    let queryResult: any;
    switch (pathParam[0]) {
      case '{usuarioId}':
        queryResult = await Note.of(NoteKeys.QueryResult)
          .answeredBy(actorInTheSpotlight());
        await actorInTheSpotlight().attemptsTo(
          Send.a(
            DeleteRequest.to(endpoint.replace(pathParamRegExp, queryResult[0].id)),
          ),
        );
        break;
      case '{alunoId}':
      default:
        break;
    }
  } else {
    await actorInTheSpotlight().attemptsTo(
      Send.a(
        DeleteRequest.to(endpoint),
      ),
    );
  }
});

When('ele informa o payload para cadastrar/editar um usuário', async () => {
  await actorInTheSpotlight().attemptsTo(
    TakeNote.of(Question.about('the payload', () => UsuarioRequest.createPayload()
      .withName('Automated Test')
      .withEmail(`email${Date.now()}@email.com`)
      .withPassword('123456')
      .withPerfilId(1)
      .build()))
      .as(NoteKeys.Payload),
  );
});

When('ele não informa a chave {string}', async (property: string) => {
  const payload = await actorInTheSpotlight().answer(Note.of(NoteKeys.Payload));
  await actorInTheSpotlight().attemptsTo(
    TakeNote.of(Question.about('the payload', () => {
      delete payload[property];
      return payload;
    })),
  );
});

When('ele informa o valor {string} na chave {string}', async (value: string, property: string) => {
  const payload:Payload = await actorInTheSpotlight().answer(Note.of(NoteKeys.Payload));
  await actorInTheSpotlight().attemptsTo(
    TakeNote.of(Question.about('the payload', () => {
      payload[property] = value;
      return payload;
    })),
  );
});

When('ele informa um usuário inexistente', async () => {
  await actorInTheSpotlight().attemptsTo(
    TakeNote.of(Question.about('the query result', () => [{ id: 0 }])).as(NoteKeys.QueryResult),
  );
});

Then('ele deve ver o status code {int}', async (statusCode: number) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(LastResponse.status(), equals(statusCode)),
  );
});

Then('ele deve ver um JSON com a lista de usuários cadastrados com as seguintes chaves', async (dataTable: DataTable) => {
  const response = await actorInTheSpotlight().answer(LastResponse.body());
  const keys = dataTable.raw().map((row) => row[0]);
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(response, listOfObjectsHasProperties(keys)),
  );
});

Then('ele deve ver um JSON com o usuário informado com as seguintes chaves', async (dataTable: DataTable) => {
  const response = await actorInTheSpotlight().answer(LastResponse.body());
  const keys = dataTable.raw().map((row) => row[0]);
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(response, objectHasTheProperties(keys)),
  );
});

Then('ele deve ver um JSON com o usuário cadastrado/alterado com as seguintes chaves', async (dataTable: DataTable) => {
  const response = await actorInTheSpotlight().answer(LastResponse.body());
  const keys = dataTable.raw().map((row) => row[0]);
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(response, objectHasTheProperties(keys)),
  );

  const payload: Payload = await actorInTheSpotlight().answer(Note.of(NoteKeys.Payload));
  const expectedPropertiesValues: ExpectedPropertyValue[] = [
    {
      property: 'nome',
      value: payload.nome,
    }, {
      property: 'email',
      value: payload.email,
    }, {
      property: 'permissao.id',
      value: payload.perfil_id,
    },
  ];
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(response, objectHasThePropertiesWithTheValues(expectedPropertiesValues)),
  );
});

Then('ele deve ver as seguintes chaves no objeto {string}', async (property: string, dataTable: DataTable) => {
  const response = await actorInTheSpotlight().answer(LastResponse.body());
  const keys = dataTable.raw().map((row) => row[0]);

  await actorInTheSpotlight().attemptsTo(
    Ensure.that(response[property], objectHasTheProperties(keys)),
  );
});

Then('ele deve ver a mensagem {string} no array do objeto {string}', async (message: string, property: string) => {
  const response = await actorInTheSpotlight().answer(LastResponse.body());
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(response[property], contain(message)),
  );
});
