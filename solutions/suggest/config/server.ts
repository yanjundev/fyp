import * as dotenv from 'dotenv';

dotenv.config();

export const server = {
  BASE_URL: process.env.API_BASE_URL,
  PORT: process.env.PORT,
};
