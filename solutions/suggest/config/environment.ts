import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  // env vars here
  DB_URL: process.env.DB_URL,
};
