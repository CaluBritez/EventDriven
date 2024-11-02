import 'dotenv/config';

export const envs = {
    port: +process.env.PORT!,
    MONGO_URL: process.env.MONGO_URL!,
    RABBITMQ_URL: process.env.RABBITMQ_URL!,
    SECRET_JWT_SEED: process.env.SECRET_JWT_SEED
} as const;