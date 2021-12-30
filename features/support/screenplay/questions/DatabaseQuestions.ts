import { Question } from '@serenity-js/core';
import { QueryMariaDb } from '../abilities';

export const TheResultOfQuery = (query: string) => Question.about('the last query', (actor) => QueryMariaDb.as(actor)
  .query(query)
  .then((result: any) => result));

export const NumberOfUsersInDatabse = () => Question.about('number of users in the database', (actor) => QueryMariaDb.as(actor)
  .query('SELECT COUNT(*) as count FROM usuarios')
  .then((result: any) => result[0].count));

export const NumberOfStudentsInDatabse = () => Question.about('number of students in the database', (actor) => QueryMariaDb.as(actor)
  .query('SELECT COUNT(*) as count FROM alunos')
  .then((result: any) => result[0].count));
