import { Ensure, equals } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { LastResponse, PostRequest, Send } from '@serenity-js/rest';

// import * as noteKeys from '../../enums/key_notes';
// import TheAuthenticationTokenValue from '../questions/TheAuthenticationTokenValue';

const GetAuthenticationTokenFor = (body: object) => Task.where(
  '#actor get the authentication token',
  Send.a(
    PostRequest.to('/v2/auth/token').with(body).using({ headers: { 'Content-Type': 'application/json' } }),
  ),
  Ensure.that(LastResponse.status(), equals(200)),
);

export default GetAuthenticationTokenFor;
