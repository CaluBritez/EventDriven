import 'dotenv/config';

export const envs = {
    port: +process.env.PORT!,
    MONGO_URL: process.env.MONGO_URL!,
    RABBITMQ_URL: process.env.RABBITMQ_URL!,
    SECRET_JWT_SEED: process.env.SECRET_JWT_SEED,
    OAUTH_CLIENTID: process.env.OAUTH_CLIENTID,
    OAUTH_CLIENTSECRET: process.env.OAUTH_CLIENTSECRET,
    OAUTH_REFRESH_TOKEN: process.env.OAUTH_REFRESH_TOKEN
} as const;