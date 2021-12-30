import { createPool } from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const pooolConfig = {
  host: process.env.host,
  port: Number(process.env.port),
  user: process.env.username,
  password: process.env.password,
  database: process.env.database,
  multipleStatements: true,
};

export const pool = createPool(pooolConfig);
