import amqp, { Channel, Connection } from 'amqplib';
import { envs } from '../config/envs';
import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';
import { template } from '../html/template';

const rabbitMqUrl = envs.RABBITMQ_URL;

let connection: Connection;
let channel: Channel;

interface SendNotificationBody {
    email: string;
    nombre: string;
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

export async function sendNotificationToQueue(email: string, nombre: string): Promise<void> {
    try {
        if (!channel) {
            throw new Error('El canal de RabbitMQ no está inicializado. Asegúrate de haber llamado a connectRabbitMQ.');
        }

        const queue = 'notification_queue';
        await channel.assertQueue(queue, { durable: true });
        const message = JSON.stringify({ email, nombre });
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Mensaje enviado a la cola ${queue}: ${message}`);
    } catch (error) {
        console.error('Error al enviar mensaje a RabbitMQ:', error);
        throw error;
    }
}

export async function receiveMessages(): Promise<void> {
    if (!channel) {
        throw new Error("El canal de RabbitMQ no está inicializado");
    }

    const queue = 'notification_queue';
    await channel.assertQueue(queue, { durable: true });
    console.log("Esperando mensajes en la cola...");

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            const { email, nombre } = JSON.parse(msg.content.toString());
            console.log(`Enviando correo a ${email} sobre el curso ${nombre}`);

            // Configuración de nodemailer
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'coodeeacademyy@gmail.com',
                    pass: 'azsp nkqf snaj fmhn',
                    clientId: envs.OAUTH_CLIENTID,
                    clientSecret: envs.OAUTH_CLIENTSECRET,
                    refreshToken: envs.OAUTH_REFRESH_TOKEN
                },
            });

            // Contenido del correo
            const mailOptions = {
                from: 'coodeeacademyy@gmail.com',
                to: email,
                subject: `Confirmación de Inscripción en ${nombre}`,
                html: template(nombre),
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`Correo enviado a ${email}`);
                channel.ack(msg); // Confirmación exitosa del mensaje
            } catch (error) {
                console.error(`Error al enviar correo a ${email}:`, error);
                channel.nack(msg, false, false); // No reintentar si ocurre un error
            }
        }
    });
}