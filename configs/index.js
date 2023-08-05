import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.join(process.cwd(), `./env/.env.${process.env.NODE_ENV}`),
  debug: process.env.NODE_ENV, // TODO: enable debugging for env variables
});

const config = {
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN,
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
