export const PORT = process.env.PORT || 5000;

export const PROD = process.env.NODE_ENV === 'production';

export const {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_USER,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  MAIL_HOST,
  MAIL_PASS,
  MAIL_USER,
} = process.env;
