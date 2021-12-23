import pool from './features/support/database/database';

pool.query('SELECT * FROM usuarios')
  .then((res) => { console.log(res); });
