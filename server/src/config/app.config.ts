import * as Joi from 'joi';

export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'development',
  tmdb_api_key: process.env.TMDB_API_KEY || '',
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || 'jwt_access_secret',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret',
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3000',
  db_host: process.env.DB_HOST || 'localhost',
  db_username: process.env.DB_USERNAME || 'postgres',
  db_password: process.env.DB_PASSWORD || 'password',
  db_name: process.env.DB_NAME || 'reelapp',
});

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  TMDB_API_KEY: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required().default('jwt_access_secret'),
  JWT_REFRESH_SECRET: Joi.string().required().default('jwt_refresh_secret'),
  FRONTEND_URL: Joi.string().required().uri().default('http://localhost:3000'),
  DB_HOST: Joi.string().required().default('localhost'),
  DB_USERNAME: Joi.string().required().default('postgres'),
  DB_PASSWORD: Joi.string().required().default('password'),
  DB_NAME: Joi.string().required().default('reelapp'),
});
