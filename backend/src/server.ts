import express, { Application, Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import {connectRabbitMQ, receiveMessages} from './services/rabbitmq.service';

interface IServer {
    listen(): void;
}

interface IServerConfig {
    port: number;
    routes: Router;
}

export class Server implements IServer {
    private readonly app: Application = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor({ port, routes }: IServerConfig) {
        this.port = port;
        this.routes = routes;
        this.middlewares();
        this.router();
    }

    private router(): void {
        this.app.use('/', this.routes);
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }
    public async connectRabbitMQ() {
        await connectRabbitMQ();
        await receiveMessages();
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
};