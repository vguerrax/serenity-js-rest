import {
  ArtifactArchiver, Cast, Actor, configure, TakeNotes,
} from '@serenity-js/core';
import { ConsoleReporter } from '@serenity-js/console-reporter';
import { SerenityBDDReporter } from '@serenity-js/serenity-bdd';
import { CallAnApi } from '@serenity-js/rest';
import dotenv from 'dotenv';

import Config from '../../test_config';
import pool from './database/database';
import QueryMariaDb from './screenplay/abilities/QueryMariaDb';

dotenv.config();

class Actors implements Cast {
  prepare(actor: Actor) {
    return actor.whoCan(
      CallAnApi.at(Config.baseUrl),
      TakeNotes.usingAnEmptyNotepad(),
      QueryMariaDb.using(pool),
    );
  }
}

configure({
  crew: [
    ConsoleReporter.forMonochromaticTerminals(),
    ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
    new SerenityBDDReporter(),
  ],
  actors: new Actors(),
});
