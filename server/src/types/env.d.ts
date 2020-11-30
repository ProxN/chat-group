declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;

    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;

    MAIL_HOST: string;
    MAIL_USER: string;
    MAIL_PASS: string;
  }
}
