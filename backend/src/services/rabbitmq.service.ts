import amqp, { Channel, Connection } from 'amqplib';
import { envs } from '../config/envs';
import { Request, Response, NextFunction } from 'express';

const rabbitMqUrl = envs.RABBITMQ_URL;

let connection: Connection;
let channel: Channel;

interface SendNotificationBody {
    userEmail: string;
    courseName: string;
}

// conectamos a rabbitmq y creamos un canal de comunicación
export async function connectRabbitMQ(): Promise<void> {
    try {
        connection = await amqp.connect(rabbitMqUrl);
        channel = await connection.createChannel();
        console.log('Conectado a RabbitMQ');
    } catch (error) {
        console.error('Error al conectar con RabbitMQ:', error);
        throw error;
    }
}

export async function sendNotificationToQueue(req: Request<{}, {}, SendNotificationBody>,res: Response,next: NextFunction): Promise<void> {
    const { userEmail, courseName } = req.body;

    if (!userEmail || !courseName) {
        res.status(400).json({ error: 'Se requieren userEmail y courseName en el body de la solicitud.' });
        return;
    }

    try {
        if (!channel) {
            throw new Error('El canal de RabbitMQ no está inicializado. Asegúrate de haber llamado a connectRabbitMQ.');
        }

        const queue = 'notification_queue';
        await channel.assertQueue(queue, { durable: true });
        const message = JSON.stringify({ userEmail, courseName });
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Mensaje enviado a la cola ${queue}: ${message}`);
        res.status(200).json({ message: 'Mensaje enviado a la cola correctamente.' });

    } catch (error) {
        console.error('Error al enviar mensaje a RabbitMQ:', error);
        res.status(500).json({ error: 'Error al enviar el mensaje a RabbitMQ' });
        next(error);
    }
}
// Función para consumir mensajes de la cola
export async function receiveMessages(): Promise<void> {
    if (!channel) {
        throw new Error("El canal de RabbitMQ no está inicializado");
    }

    const queue = 'notification_queue';
    await channel.assertQueue(queue, { durable: true });
    console.log("Esperando mensajes en la cola...");

    channel.consume(queue, (msg) => {
        if (msg !== null) {
            const { userEmail, courseName } = JSON.parse(msg.content.toString());
            console.log(`Enviando correo a ${userEmail} sobre el curso ${courseName}`);
            // Aquí iría el código para enviar el correo.
            channel.ack(msg);
        }
    });
}