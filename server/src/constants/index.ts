export const PORT = process.env.PORT || 5000;

export const PROD = process.env.NODE_ENV === 'production';

export const { DB_HOST, DB_NAME, DB_PASS, DB_USER } = process.env;
