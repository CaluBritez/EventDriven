import { envs } from './config/envs';
import { DbConnect } from './database/dbConnect';
import { routes } from './routes/index.routes';
import { Server } from './server';

(async () => {
    const server = new Server({
        port: envs.port,
        routes: routes
    });
    const db = new DbConnect({ 
        mongoUrl: envs.MONGO_URL
    });
    await db.connect();
    await server.connectRabbitMQ();
    server.listen();
})();